## Radio 单选框

在一组备选项中进行单选

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

:::demo 要使用 Radio 组件，只需要设置`v-model`绑定变量，选中意味着变量的值为相应 Radio `label`属性的值，`label`可以是`String`、`Number`或`Boolean`。

```html
<template>
  <div><bc-button>test</bc-button></div>
  <div><i class="el-icon-success"></i></div>
</template>

<script>
  export default {
    data() {
      return {
        radio1: '1',
        radio2: '1',
        radio3: '1',
        radio4: '1',
      }
    },
  }
</script>
<!--
<setup>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      return {
        radio1: ref('1'),
        radio2: ref('1'),
        radio3: ref('1'),
        radio4: ref('1'),
      }
    }
  })
</setup>
-->
```

:::

### Radio Attributes

| 参数                  | 说明           | 类型                      | 可选值                | 默认值 |
| --------------------- | -------------- | ------------------------- | --------------------- | ------ |
| model-value / v-model | 绑定值         | string / number / boolean | —                     | —      |
| label                 | Radio 的 value | string / number / boolean | —                     | —      |
| disabled              | 是否禁用       | boolean                   | —                     | false  |
| border                | 是否显示边框   | boolean                   | —                     | false  |
| size                  | Radio 的尺寸   | string                    | medium / small / mini | —      |
| name                  | 原生 name 属性 | string                    | —                     | —      |

### Radio Events

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| change   | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio-group Attributes

| 参数                  | 说明                                    | 类型                      | 可选值                | 默认值  |
| --------------------- | --------------------------------------- | ------------------------- | --------------------- | ------- |
| model-value / v-model | 绑定值                                  | string / number / boolean | —                     | —       |
| size                  | 单选框组尺寸                            | string                    | medium / small / mini | —       |
| disabled              | 是否禁用                                | boolean                   | —                     | false   |
| text-color            | 按钮形式的 Radio 激活时的文本颜色       | string                    | —                     | #ffffff |
| fill                  | 按钮形式的 Radio 激活时的填充色和边框色 | string                    | —                     | #409EFF |

### Radio-group Events

| 事件名称 | 说明                   | 回调参数              |
| -------- | ---------------------- | --------------------- |
| change   | 绑定值变化时触发的事件 | 选中的 Radio label 值 |

### Radio-button Attributes

| 参数     | 说明           | 类型            | 可选值 | 默认值 |
| -------- | -------------- | --------------- | ------ | ------ |
| label    | Radio 的 value | string / number | —      | —      |
| disabled | 是否禁用       | boolean         | —      | false  |
| name     | 原生 name 属性 | string          | —      | —      |