---
title: Tables
---

# Table

基于`elementui plus`的`table`二次封装，通过配置`config`的形式简化书写表格代码时的重复度。对于`table`和`table column`的属性在透传上进行了增强，进一步加强了表格的功能性。

## Basic table

Basic table is just for data display.

:::demo

table/basic

:::

## 多选

由于`element`的`table`多选功能的手动选择依赖表格数据的引用，在回显的时候很难处理，因此参考了`antdv`的做法，增强了多选功能，可以通过`{ type: 'select' }`开启.

:::demo

table/selection

:::

## 自定义单元格

:::demo 可以通过插槽的形式，自定义单元格里的内容

table/customCell

:::

## 自定义表头

:::demo 可以通过设置`header: true`开启自定义表头，插槽名为对应`{prop}-header`

table/customHeader

:::

## 行内省略

主要是添加了一个统一的开关，避免重复设置同一个属性。

:::demo 可以通过`show-overflow-tooltip`统一开启所有列的行内省略，同时也兼容原生的属性，支持针对单列的独立配置

table/overflowTooltip

:::

## 多级表头

:::demo 列配置中加上`children`，可以用来管理多级表头

table/multipleHeader

:::

## 行内编辑

:::demo 通过`editable`可以对指定列开启行内编辑

table/cellEdit

:::

## 单选框

:::demo 与`type: selection`类似，可以通过`type: radio`添加一列单选框。

table/radio

:::

## 行合并

:::demo `element-plus`的实现太底层了，所以使用起来有点麻烦。通过`colspanOptions`可以更直观的配置哪些列需要被合并。

table/rowMerge

:::

## 远程数据

`table`将远程数据的请求进行了封装，对诸如`page`,`pagesize`,`total`这些分页参数，在组件内部就进行了托管，不需要开发人员再自行维护。

:::warning
因为分页的相关数据和行为交给了组件，所以只有请求这个行为必须要交给`table`去触发。因此在获取数据的时候不是用户操作按钮去请求数据，而是用户操作按钮通知`table`去请求数据。
:::

:::demo

table/remote

:::

## 空白单元格
可以通过`table`的`emptyText`来设置表格对于空白单元格的处理方式
支持`function`和`string`

:::tip
在渲染的时候组件内部会对单元格做空值判断，因此在通过`function`动态设置空白单元格的时候可以直接通过判断是否为`空字符串`来判断是否为空白单元格
:::

:::demo

table/emptyCell

:::

## Table 属性

| 属性           | 说明                                                      | 类型                | 可选值 | 默认值                  |
| :------------- | :-------------------------------------------------------- | :------------------ | :----- | :---------------------- |
| config         | 表格列配置                                                | object              | -      | []                      |
| data           | 表格数据源                                                | array               | -      | []                       |
| api            | 远程数据获取的回调函数                                    | function(): promise | -      | -                       |
| arrayName      | 远程获取表格数据的字段名，可通过 config-provider 全局设置 | string              | -      | -                       |
| pagination     | 是否使用分页组件                                          | boolean             | -      | false                   |
| modelValue/v-model | 分页参数，支持双向绑定                                    | object              | -      | `{ page: 1, rows: 20 }` |
| total          | 本地数据源使用分页功能需要手动维护 total                  | number              | -      | 0                       |
| colspanOptions | 行合并相关配置                                            | object              | -      | -                       |
| padding        | 表格的内边距                                              | boolean             | -      | true                    |
| custom         | 是否自定义表格数据                                        | boolean             | -      | false                   |
| filter         | 表格数据过滤器                                            | function(data)      | -      | -                       |
| immediate      | 是否在 created 时自动获取数据，仅在数据源为远程数据时有效 | boolean             | - | true   |
| fixXScroll     | 固定列过多在产生底部滚动条在浏览器视窗的底部（Beta）      | boolean             | -      | false                   |
| simple         | 简易表格，支持本地分页                                    | boolean             | -      | false                   |
| load           | 是否在获取远程数据里显示 loading 动画                     | boolean             | -      | true                    |
| emptyText | 设置空白单元格的填充内容 | function(val, column)/string | - | '' |
| rowSelection | 列表项是否可选择，配置项见`Row-selection` | object | null |

## Table 插槽
| 名称   | 说明                                 |
| :----- | :----------------------------------- |
| [prop] | 自定义对应列的内容，参数为`{ row, column, $index }`
| [prop]-header | 自定义对应列表头的内容，参数为`{ column, $index }`

## Table 事件
| 事件名 | 说明 | 参数 |
| :---- | :--- | :--- |
| save | 当行内编辑输入框用户回车时触发 | value |
| blur | 当行内编辑输入框失焦时触发 | value |

:::tip
之所以针对行内编辑要区分`save`和`blur`事件，是因为回车是用户主观上希望保存的行为，但是失焦在不同业务场景下有不同的需求，所以独立开来了。
:::

## Table-column 属性

:::tip
可以通过config去设置每一列的属性
:::

| 属性           | 说明                                                      | 类型                | 可选值 | 默认值                  |
| :------------- | :-------------------------------------------------------- | :------------------ | :----- | :---------------------- |
| type | 列的特殊功能 | string | `expand` / `selection` / `radio` | - |
| label | 每一列表头显示的名称 | string | - | - |
| prop | 每一列对应的数据字段，同时也是自定义时的插槽名 | string | - | - |
| header | 是否需要自定义列表头，只有在开启时`[prop]-header`插槽才会生效 | boolean | - | false |
| editable | 是否开启行内编辑 | boolean | - | false |
| filter | 列数据过滤器 | function / object | - | - |
| unit | 列数据的单位，会自动添加在数据后 | string | - | - |

## Row-selection 属性
多选功能的配置

:::warning
必须设置`row-key`
:::

| 参数           | 说明                                                      | 类型                | 可选值 | 默认值                  |
| :------------- | :-------------------------------------------------------- | :------------------ | :----- | :---------------------- |
| selectedRowKeys | 指定选中项的 key 数组，需要和 onChange 进行配合 | string[] | [] |
| onChange | 选中项发生变化时的回调 | Function(selectedRowKeys) | - |
