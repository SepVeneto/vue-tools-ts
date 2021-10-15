<template>
  <transition class="transition-config" :name="name" v-bind="$attrs">
    <slot v-if="show" />
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { motionProps } from './type';
import './style.scss'

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
