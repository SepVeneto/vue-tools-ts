<template>
  <bc-button @click="display = !display">{{ display ? '离开' : '进入'}}</bc-button>
  <section style="position: fixed; top: 0; left: 0;width: 100vw; height: 100vh; pointer-events: none;">
    <bc-motion type="fade" direction="up" :show="display">
      <div class="portal"></div>
    </bc-motion>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const display = ref(false)
</script>

<style lang="scss">
.portal {
  position: absolute;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: crimson;
  width: 200px;
  height: 200px;
  // transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
