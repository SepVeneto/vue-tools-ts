<template>
  <transition
    class="bc-motion-config"
    :name="name"
    v-bind="$attrs"
    :style="{
      transitionDelay: delay
    }"
  >
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
      return `bc-motion-${props.type}-${props.direction}`
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
