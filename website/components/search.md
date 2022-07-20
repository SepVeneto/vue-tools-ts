---
title: Search
---

# 搜索框

## 基本用法

支持通过插槽对所有的可见元素，如输入框，新增按钮等进行自定义
:::warning
在触发`created`时，组件会保存`modelValue`的值做为后续重置操作的数据源，否则会默认清空所有的搜索条件
:::

:::demo

search/basic

:::

## 默认值

对于需要动态更改默认搜索条件的，可以通过设置`defalut-value`来确保`重置`后的搜索条件会及时更新。或者也可以通过重写`reset`方法来手动维护重置的状态。
:::demo

search/default

:::

## 属性

| 属性          | 说明                       | 类型     | 可选值                                     | 默认值                                             |
| :------------ | :------------------------- | :------- | :----------------------------------------- | :------------------------------------------------- |
| v-model/modelValue| 绑定值 | object | - | - |
| page-name     | 分页时当前页码的字段       | string   | -                                          | 'page'                                             |
| default-value | 重置时的默认值             | object   | -                                          | -                                                  |
| create        | 是否显示新增按钮           | boolean  | -                                          | false                                              |
| config        | 搜索栏的可查询内容         | config[] | -                                          | -                                                  |
| search        | 搜索和重置触发时的回调函数 | function | -                                          | -                                                  |
| import        | 是否显示上传按钮           | boolean  | -                                          | false                                              |
| upload        | 文件上传的相关配置         | object   | -                                          | -                                                  |
| export        | 是否显示导出按钮           | boolean  | -                                          | true                                               |
| layout        | 搜索栏默认按钮的布局       | array    | `seach`/`reset`/`upload`/`export`/`create` | ['create', 'search', 'reset', 'upload', 'export'], |

## Config属性

| 名称 | 说明 |
| :---| :----|
| prop | 绑定值的字段（支持链式调用） |
| catalog | 支持的搜索方式（`input`, `select`, `datepicker`）|

:::tip
不设置`catalog`时，可以通过对应`prop`的具名插槽自定义搜索方式
:::

## 插槽

| 名称   | 说明                                 |
| :----- | :----------------------------------- |
| -      | 自定义搜索栏除自带的按钮外的其它功能 |
| #prop  | 自定义对应`prop`的搜索框的内容       |
| create | 自定义新增按钮                       |
| search | 自定义搜索按钮                       |
| reset  | 自定义重置按钮                       |
| export | 自定义导出按钮                       |
| upload | 自定义上传按钮                       |

:::warning
上述的按钮目前在自定义后会失去原先的点击事件，诸如搜索、重置这些功能需要手动实现。
:::

:::tip
`layout`属性也会影响到自定义属性。如果需要完全的自定义，可以通过清空`layout`，在默认插槽中补充需要的内容
:::
