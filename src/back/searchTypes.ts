// @/types/searchTypes.ts
/**
 * 下拉选择器/级联选择器 通用的选项类型（抽离复用，避免冗余嵌套定义）
 * 适用于 select 的平级选项、cascader 的树形级联选项
 */
export interface OptionItem {
  label: string;
  value: string | number;
  children?: OptionItem[]; // 级联子项，递归引用自身，类型统一
}

/**
 * 搜索配置项的TS类型约束 (完全保留你定义的所有内容，仅优化格式+补注释+抽离复用)
 */
export interface SearchItem {
  label?: string; // 表单左侧label文字 可选
  prop?: string; // 绑定queryForm的属性key 可选 (你的主代码用了item.prop ?? '' 适配这个可选)
  width: number; // 栅格宽度span值 必传
  type: 'input' | 'select' | 'empty' | 'timePicker' | 'cascader'; // 严格字面量联合类型，含你新增的empty占位类型
  placeholder?: string; // 输入框/选择器占位符 可选
  options?: OptionItem[]; // select/cascader 下拉选项列表 可选
}
