---
title: Select
---

# Select

## 基本用法

:::demo 透传了`element-plus`的所有属性，同时暴露了一个`label`，可以通过双向绑定同步更新。`custom-label`和`custom-value`用于自定义`options`中展示和绑定的值的字段。

select/basic

:::

## 远程数据源

:::demo

select/api

:::

## 默认值

:::demo

select/default

:::

## 展示模式

:::demo

select/display

:::

## 绑定对象

:::demo

select/bindObject

:::

## 属性
| 属性           | 说明                                                      | 类型                | 可选值 | 默认值                  |
| :------------- | :-------------------------------------------------------- | :------------------ | :----- | :---------------------- |
| customLabel | 选项显示值的字段 | string | - | 'label' |
| customValue | 选项绑定值的字段 | string | - | 'value' |
| arrayName | 远程数据的字段 | string | - | 'data' |
| label / v-model:label | 绑定option的显示值 | string | - | - |
| group | 是否需要对options进行分组 | boolean | - | false |
| children | option分组的依据，需要与`group`一起使用 | boolean | - | false |
| defaultValue | 初始化时的默认值 | object / number / string / array | - | - |
| immediate | 是否在初始化时请求远程数据 | boolean | - | true |
| onlyDisplay | 是否只读（以div包裹）| boolean | - | false |
| optionKey | 选项的key值，在绑定值为对象时必填 | string | - | 'value' |
| width | 选择框的宽度 | string / number | - | - |
| api| 获取远程数据的方法，返回一个promise对象 | function | - | - |
| options | 选项列表 | array | - | - |
| itemDisabled | 选项中的禁用项，等价于`element-plus`中`select-options`的disabled | function(option): boolean | - | - |

## 方法
| 方法 | 说明 | 参数 |
| :--- | :-- | :--- |
| getOptions | 获取当前选择框的选项列表 | - |
| getLabel | 获取指定label对应的value | label,默认为当前选中项 |
