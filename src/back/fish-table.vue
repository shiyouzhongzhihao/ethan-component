<template>
  <div>
    <el-form v-if="searchConfigList.length > 0" :model="queryForm" name="basic" autocomplete="off">
      <el-row :gutter="20">
        <el-col v-for="(item, index) in searchConfigList" :key="index" :span="item.width">
          <el-form-item
            :label="item.label"
            :label-width="item.labelWidth"
            :label-position="item.labelPosition"
          >
            <!--输入框-->
            <el-input
              v-if="item.type === 'input'"
              v-model="queryForm[item.prop ?? '']"
              :placeholder="item.placeholder"
            />
            <!--普通选择器-->
            <el-select
              v-else-if="item.type === 'select'"
              v-model="queryForm[item.prop ?? '']"
              :placeholder="item.placeholder"
              :options="item.options"
            />
            <!--级联选择器-->
            <el-cascader
              v-else-if="item.type === 'cascader'"
              v-model="queryForm[item.prop ?? '']"
              :placeholder="item.placeholder"
              :options="item.options"
              change-on-select
            />
            <!--日期选择框-->
            <el-date-picker
              v-else-if="item.type === 'timePicker'"
              v-model="queryForm[item.prop ?? '']"
              type="datetimerange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              time-format="A hh:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="btnCol">
          <div class="btn-group">
            <el-button type="primary" class="search-btn" @click="search">查询</el-button>
            <el-button type="default" class="clear-btn" @click="clear">清空</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-top" v-if="showHeader">
      <span>总共{{ pageInfo.size }}条数据</span>
      <div class="btn-group">
        <slot name="header"></slot>
      </div>
    </div>

    <div class="custom-header" v-if="showCustomHeader">
      <slot name="customHeader"></slot>
    </div>

    <el-table
      :data="tableData"
      v-loading="loading"
      :height="height"
      :stripe="stripe"
      @selection-change="changeSelect"
      v-model:selection="selectedRows"
      :style="`margin-top:${top}`"
      style="width: 100%"
    >
      <el-table-column
        v-for="item in column"
        :type="item.type"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed"
        :align="item.align"
        :min-width="item.minWidth"
      >
        <template #default="scope" v-if="!item.type">
          <template v-if="item.slot">
            <slot :name="item.slot" v-bind="scope"></slot>
          </template>
          <template v-else>
            <el-text :type="item.color">{{ scope.row[item.prop] }}</el-text>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        :layout="layout"
        :total="pageInfo.size"
        :current-page="pageInfo.pageNum"
        :page-size="pageInfo.pageSize"
        @current-change="changePage"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick } from 'vue';
import { useSlots } from 'vue';

interface SearchItem {
  label?: string;
  labelWidth?: string;
  labelPosition?: string;
  prop?: string;
  width: number;
  type: 'input' | 'select' | 'empty' | 'timePicker' | 'cascader';
  placeholder?: string;
  options?: OptionItem[];
  start?: string;
  end?: string;
}
interface OptionItem {
  label: string;
  value: string | number;
  children?: OptionItem[];
}
interface PaginationMap {
  request: {
    pageNum: string;
    pageSize: string;
  };
  response: {
    total: string;
    pages?: string;
    records: string;
    current: string;
    pageSize: string;
  };
}

const props = defineProps({
  // 搜索配置项
  searchConfigList: {
    type: Array as () => SearchItem[],
    default: () => [],
  },
  // 前置搜索条件
  preSearchForm: {
    type: Object as () => any,
    default: () => ({}),
  },
  // 按钮所占列数
  btnCol: {
    type: Number,
    default: 6,
  },
  // 接口
  getTableList: {
    type: Function,
    required: true,
  },
  // 列元素
  column: {
    type: Array as () => any[],
    default: () => [],
    required: true,
  },
  // 表格高度
  height: {
    type: String,
  },
  // 是否显示表头部操作栏
  showHeader: {
    type: Boolean,
    default: false,
  },
  // 自定义靠头
  showCustomHeader: {
    type: Boolean,
    default: false,
  },
  // 斑马线
  stripe: {
    type: Boolean,
    default: true,
  },
  // 默认每页条数
  defaultPageSize: {
    type: Number,
    default: 10,
  },
  // 映射
  paginationMap: {
    type: Object as () => PaginationMap,
    default: () => ({
      request: {
        pageNum: 'pageNum',
        pageSize: 'pageSize',
      },
      response: {
        total: 'total',
        pages: 'pages',
        records: 'records',
        current: 'current',
        pageSize: 'pageSize',
      },
    }),
  },
  // 分页布局
  layout: {
    type: String,
    default: 'prev, pager, next',
  },
  // 表格距离顶部的距离
  top: {
    type: String,
    default: '0px',
  },
  // 初始请求
  disableInitFetch: {
    type: Boolean,
    default: false,
  },
});

// 搜索表单数据（组件内部的搜索条件）
const queryForm = ref<Record<string, any>>({});
// 多选选中的行
const selectedRows = ref<any[]>([]);
// 插槽
const slots = useSlots();
// 分页信息
const pageInfo = ref({
  pageNum: 1,
  pageSize: props.defaultPageSize,
  size: 0,
});
const searchInfo = ref<Record<string, any>>({});
const loading = ref(false);
const tableData = ref<any[]>([]);

const transformRequestParams = (params: {
  search: Record<string, any>;
  pagination: { pageNum: number; pageSize: number };
}) => {
  const { request: reqMap } = props.paginationMap;
  const transformed = { ...params.search };
  transformed[reqMap.pageNum] = params.pagination.pageNum;
  transformed[reqMap.pageSize] = params.pagination.pageSize;
  return transformed;
};

const transformResponseData = (res: Record<string, any>) => {
  if (!res)
    return {
      records: [],
      total: 0,
      current: 1,
      pageSize: props.defaultPageSize,
    };

  const { response: resMap } = props.paginationMap;
  return {
    records: res[resMap.records] || [],
    total: res[resMap.total] || 0,
    current: res[resMap.current] || 1,
    pageSize: res[resMap.pageSize] || props.defaultPageSize,
  };
};

const handleSizeChange = (newSize: number) => {
  pageInfo.value.pageSize = newSize;
  pageInfo.value.pageNum = 1;
  getTable(searchInfo.value, true);
};

const getTable = async (search?: Record<string, any>, resetPage: boolean = false) => {
  // 等待props传递
  await nextTick();
  // 重置页码时，回到第1页并清空选中行
  if (resetPage) {
    pageInfo.value.pageNum = 1;
    selectedRows.value = [];
  }

  searchInfo.value = { ...search };
  // 时间处理
  props.searchConfigList.forEach(item => {
    if (item.type === 'timePicker' && item.prop && item.start && item.end) {
      const timeRange = searchInfo.value[item.prop];
      if (Array.isArray(timeRange) && timeRange.length === 2) {
        searchInfo.value[item.start] = timeRange[0];
        searchInfo.value[item.end] = timeRange[1];
      }
      delete searchInfo.value[item.prop];
    }
  });
  const requestParams = {
    search: searchInfo.value,
    pagination: {
      pageNum: pageInfo.value.pageNum,
      pageSize: pageInfo.value.pageSize,
    },
  };

  const transformedParams = transformRequestParams(requestParams);

  loading.value = true;
  try {
    const rawRes = await props.getTableList({ ...props.preSearchForm, ...transformedParams });
    const transformedRes = transformResponseData(rawRes);
    tableData.value = transformedRes.records;
    pageInfo.value.size = transformedRes.total;
    pageInfo.value.pageNum = transformedRes.current;
  } catch (error) {
    console.error('获取表格数据失败:', error);
  } finally {
    loading.value = false;
  }
};

// 切换页码
const changePage = async (current: number) => {
  pageInfo.value.pageNum = current;
  await getTable(searchInfo.value);
};

// 清空搜索
const clearSearch = () => {
  queryForm.value = {};
};
const search = async () => {
  await getTable({ ...queryForm.value }, true);
};

const clear = async () => {
  queryForm.value = {};
  await getTable({}, true);
};

const changeSelect = (rows: any) => {
  selectedRows.value = rows;
};
const deleteData = async () => {
  const currentDataCount = tableData.value.length;
  const { pageNum, pageSize } = pageInfo.value;

  if (currentDataCount === 1 && pageNum > 1) {
    pageInfo.value.pageNum = pageNum - 1;
  }

  await getTable(searchInfo.value);
};
computed(() => !!slots.action);

onMounted(async () => {
  if (!props.disableInitFetch) {
    await getTable();
  }
});

defineExpose({
  queryForm,
  getTable,
  selectedRows,
  pageInfo,
  deleteData,
  clearSearch,
});
</script>

<style lang="scss" scoped>
.table-top {
  height: 30px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
}
.pagination {
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
}
.btn-group {
  display: flex;
  justify-content: flex-end;
}
</style>
