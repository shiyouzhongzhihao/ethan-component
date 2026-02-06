import type { OptionItem } from '@/back/searchTypes.ts';

interface SearchItem {
  label?: string
  prop?: string
  width: number
  type: 'input' | 'select' | 'empty' | 'timePicker' | 'cascader'
  placeholder?: string
  options?: OptionItem[]
  start?: string
  end?: string
}

export const searchBar: SearchItem[] = [
  {
    label: '姓名',
    width: 5,
    type: 'input',
    prop: 'name',
    placeholder: '请输入姓名',
  },
  {
    label: '性别',
    width: 5,
    type: 'select',
    prop: 'gender',
    placeholder: '请选择性别',
    options: [
      { label: '男', value: '男' },
      { label: '女', value: '女' },
    ],
  },
  {
    label: '创建时间',
    width: 7,
    type: 'timePicker',
    prop: 'createTime',
    start: 'startTime',
    end: 'endTime',
  },
];
