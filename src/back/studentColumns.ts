export const studentColumns = [
  {
    id: 0,
    type: 'selection',
    width: '55'
  },
  {
    id: 1,
    type: 'index',
    width: '55',
    label: '序号',
  },
  {
    id: 2,
    label: '姓名',
    width: '100',
    prop: 'name',
    align: 'left',
    color: 'primary',
    slot: 'name'
  },
  {
    id: 3,
    label: '学号',
    width: '100',
    prop: 'studentId',
    align: 'left',
  },
  {
    id: 4,
    label: '性别',
    width: '80',
    prop: 'gender',
    align: 'center',
  },
  {
    id: 5,
    label: '创建时间',
    width: '200',
    prop: 'createTime',
    align: 'center',
  },
  {
    id: 6,
    label: '籍贯',
    width: '200',
    prop: 'address',
    align: 'left',
  },
  {
    id: 7,
    label: '操作',
    align: 'center',
    fixed: 'right',
    slot: 'action'
  }
];
export const propertyColumn:any = [
  {
    id: 1,
    prop: 'name',
    label: '属性名',
    width: '150'
  },
  {
    id: 2,
    prop: 'remark',
    label: '说明',
  },
  {
    id: 3,
    prop: 'argumentType',
    width: '100',
    label: '参数类型',
  },
  {
    id: 4,
    prop: 'apiDefault',
    width: '100',
    label: '默认值',
  },
  {
    id: 7,
    label: '操作',
    width: '140',
    align: 'center',
    fixed: 'right',
    slot: 'action'
  }
]
export const eventColumn:any = [
  {
    id: 1,
    prop: 'name',
    label: '事件名',
    width: '150'
  },
  {
    id: 2,
    prop: 'remark',
    label: '说明',
  },
  {
    id: 7,
    label: '操作',
    width: '140',
    align: 'center',
    fixed: 'right',
    slot: 'action'
  }
]
export const slotColumn:any = [
  {
    id: 1,
    prop: 'name',
    label: '插槽名',
    width: '150'
  },
  {
    id: 2,
    prop: 'remark',
    label: '说明',
  },
  {
    id: 7,
    label: '操作',
    width: '140',
    align: 'center',
    fixed: 'right',
    slot: 'action'
  }
]
export const exposeColumn:any = [
  {
    id: 1,
    prop: 'name',
    label: '暴露名',
    width: '150'
  },
  {
    id: 2,
    prop: 'remark',
    label: '说明',
  },
  {
    id: 3,
    prop: 'argumentType',
    width: '100',
    label: '参数类型',
  },
  {
    id: 7,
    label: '操作',
    width: '140',
    align: 'center',
    fixed: 'right',
    slot: 'action'
  }
]
export const styleColumn:any = [
  {
    id: 1,
    prop: 'name',
    label: '样式名',
    width: '150'
  },
  {
    id: 2,
    prop: 'remark',
    label: '说明',
  },
  {
    id: 7,
    label: '操作',
    width: '140',
    align: 'center',
    fixed: 'right',
    slot: 'action'
  }
]
export const routeColumn:any = [
  {
    id: 1,
    type: 'index',
    width: '55',
    label: '序号',
  },
  {
    id: 4,
    prop: 'label',
    label: '路由名',
    width: '150'
  },
  {
    id: 2,
    prop: 'path',
    label: 'path路径',
    width: '150'
  },
  {
    id: 3,
    prop: 'name',
    label: '路由标识',
    width: '150',
    align: 'center',
    color: 'primary',
    slot: 'name'
  },
  {
    id: 4,
    prop: 'component',
    label: '组件路径',
  },
  {
    id: 7,
    label: '操作',
    width: '140',
    align: 'center',
    fixed: 'right',
    slot: 'action'
  }
]
