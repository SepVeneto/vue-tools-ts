<template>
  <transition
    class="bc-motion-config"
    :name="name"
    v-bind="$attrs"
    :style="{
      transitionDelay: delay,
    }"
  >
    <slot ref="slotRef" v-if="show" />
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { motionProps } from './type';

export default defineComponent({
  name: 'BcMotion',
  props: motionProps,
  setup(props) {
    const name = computed(() => {
      const classes = [props.type, props.direction].filter(item => !!item).join('-')
      return `bc-motion-${classes}`
    })
    return {
      name,

      // show,
    }
  },
})
</script>
