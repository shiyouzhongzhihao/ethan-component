<template>
  <fish-table
    ref="superTableRef"
    :get-table-list="getStudentList"
    :column="studentColumns"
    :showHeader="true"
    :defaultPageSize="5"
    :paginationMap="customPaginationMap"
    layout="sizes, prev, pager, next, jumper, ->, total"
    :search-config-list="searchBar"
    :btn-col="7"
  >
    <template #header>
      <el-button type="primary">新增数据</el-button>
    </template>
    <template #name="scope">
      <el-button link type="primary">{{ scope.row.name }}</el-button>
    </template>
    <template #action="scope">
      <el-button link type="primary">编辑</el-button>
      <el-button link type="danger" @click="handleDelete(scope.row)">删除</el-button>
    </template>
  </fish-table>
</template>

<script setup lang="ts">
import { deleteStudent, getStudentList } from '@/api/getTable.ts'
import { studentColumns } from '@/back/studentColumns.ts'
import { searchBar } from '@/back/searchBar'
import { ref } from 'vue'
import FishTable from '@/back/fish-table.vue'

const customPaginationMap = {
  request: {
    pageNum: 'pageNum',
    pageSize: 'pageSize',
  },
  response: {
    total: 'size',
    records: 'records',
    current: 'pageNum',
    pageSize: 'pageSize',
  },
}
const test = () => {
  // 初始化
  // superTableRef.value.getTable({}, true);
  // 编辑完成后的原页刷新
  superTableRef.value.getTable();
}
const superTableRef = ref()
const handleDelete = async (row: any) => {
  await deleteStudent({ studentId: row.studentId })
  superTableRef.value.getTable();
}
</script>

<style lang="scss" scoped>
:deep(.el-table th.el-table__cell) {
  background-color: #f2f2f2;
}
</style>
