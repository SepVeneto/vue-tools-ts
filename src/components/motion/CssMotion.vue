<template>
  <transition class="transition-config" :name="name" v-bind="$attrs">
    <slot v-if="show" />
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { motionProps } from './type';

export default defineComponent({
  name: 'BcMotion',
  props: motionProps,
  setup(props) {
    const show = ref(false);
    const name = computed(() => {
      return `${props.type}-${props.direction}`
    })
    onMounted(() => {
      show.value = true;
    })
    return {
      name,

      show,
    }
  },
})
</script>

<style scoped lang="scss">
.transition-config {
  &.fade-left-enter-active,
  &.fade-right-enter-active,
  &.fade-up-enter-active,
  &.fade-down-enter-active {
    transition: all .3s ease;
    transition-delay: v-bind(delay);
  }
}

.fade-left-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}
.fade-right-enter-from {
  transform: translateX(10px);
  opacity: 0;
}
.fade-up-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.fade-down-enter-from {
  transform: translateY(10px);
  opacity: 0;
}
</style>
