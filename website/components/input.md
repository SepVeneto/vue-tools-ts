---
title: Input
---

# 输入框
在`element-plus`的基础上，针对业务场景做了一些功能上的增强，同时通过`透传`保证了原生的正常用法。
## 基本用法
对`element-plus`的原生属性做了最基本的透传，可以直接使用原生的属性
:::demo

input/basic

:::

## 边框设置

:::demo

input/border

:::

## Input属性
| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| ---- | --- | ---- | ----- | ------ |
| defalut-value | created阶段设置，不会随输入结果改变 | string | - | - |
| width | 输入框的宽度 | string/number | - | - |
| border | 输入杠的边框 | string | 'all'/'bottom'/'none' | 'all' |
| only-display | 与readonly不同，将`input`替换成`div`，一般用在打印之类的地方| boolean | - | false |
