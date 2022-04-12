---
title: Dialog
---

# 对话框
基于`element-plus`的`dialog`组件进行了二次封装，在此基础上对一些用法和功能做了封装。

## 基本用法
基本用法与原组件相同
:::demo

dialog/basic

:::

## 自定义底部
通过插槽`footer`可对底部操作栏进行自定义。
如果不需要，可以设置一个空的插槽，或者通过属性`no-footer`进行控制
:::demo

dialog/customFooter

:::

## 滚动条
内置了`el-scrollbar`，默认最大高度`500px`，可以通过全局样式进行覆盖。
:::demo

dialog/scrollbar

:::

## 全屏
对全屏功能进行封装，可以通过`need-fullscreen`开启右上角的全屏按钮
:::tip
全屏状态下内置的滚动条容器的高度固定为`100vh - 200px`，可以通过全局样式覆盖。
:::

:::demo

dialog/fullscreen

:::

## Dialog 属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :---- | :--- | :---- | :----- | :------ |
| no-footer | 不显示对话框底部的操作栏（对插槽生效） | boolean | - | false |
| need-fullscreen | 是否显示右上角的全屏按钮 | boolean | - | false |

## Dialog 插槽
| 名称   | 说明                                 |
| :----- | :----------------------------------- |
| footer | 对话框底部的操作栏


