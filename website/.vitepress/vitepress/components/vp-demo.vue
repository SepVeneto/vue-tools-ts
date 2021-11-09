<template>
  <section>
    <div v-html="decodeURIComponent(description)"></div>
    <div class="example-main">
      <component :is="demo" v-if="demo" />
      <transition
        name="collapse"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
      >
        <VPSourceCode :source="source" v-if="show" :raw-source="rawSource" />
      </transition>
      <div
        :class="['footer-operate', {'is-sticky': show}]"
        @click="handleShow"
      >{{show ? '收起' : '展开'}}代码</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
export default defineComponent({
  name: 'VPDemo',
})
</script>

<script lang="ts" setup>
import VPSourceCode from './vp-source-code.vue'
import { ref } from 'vue'
const props = defineProps({
  source: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  css: {
    type: String,
    required: true,
  },
  cssPreProcessor: {
    type: String,
    required: true,
  },
  js: {
    type: String,
    required: true,
  },
  jsPreProcessor: {
    type: String,
    required: true,
  },
  html: {
    type: String,
    required: true,
  },
  demos: {
    type: Object,
    required: true,
  },
  rawSource: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
})

const formatPathDemos = computed(() => {
  const demos = {};
  Object.keys(props.demos).forEach(key => {
    demos[key.replace('../examples/', '').replace('.vue', '')] = props.demos[key].default
  })
  return demos;
})
const demo = formatPathDemos.value[props.path]

const show = ref(false)
function handleShow() {
  show.value = !show.value;
}
function onBeforeEnter(e: Element) {
  (e as HTMLElement).style.height = '0';
}
function onEnter(el: Element) {
  const e = el as HTMLElement;
  e.style.height = e.scrollHeight + 'px';
}
function onLeave(e: Element) {
  (e as HTMLElement).style.height = '0';
}
function onBeforeLeave(el: Element) {
  const e = el as HTMLElement;
  e.style.height = e.scrollHeight + 'px';
}
</script>

<style lang="scss" scoped>
.example-main {
  padding: 0 1.5rem;
  padding-top: 1rem;
  border: 1px solid #d9d9d9;
}
.collapse-enter-active, .collapse-leave-active {
  transition: height 0.24s linear;
}
.footer-operate {
  margin: 0 -1.5rem;
  margin-top: 1rem;
  border-top: 1px solid #d9d9d9;
  background-color: #fff;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  &.is-sticky {
    position: sticky;
    bottom: 0;
    z-index: 1;
  }
}
</style>
