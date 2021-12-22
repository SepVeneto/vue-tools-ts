<template>
  <aside ref="container" class="catalog-container">
    <nav class="vp-catalog">
      <div class="title">目录</div>
      <ul>
        <li v-for="item in catalogs" :key="item.link">
          <a :href="item.link"> {{item.text}} </a>
        </li>
      </ul>
      <div class="catalog-marker" ref="marker"></div>
    </nav>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useActiveSidebarLinks } from '../hooks/active-bar';
export default defineComponent({
  name: 'VPCatalog',
})
</script>

<script lang="ts" setup>
import { useCatalog } from '../hooks/catalog'
import { ref } from 'vue'
const container = ref()
const marker = ref()
useActiveSidebarLinks(container, marker);
const catalogs = useCatalog();
</script>

<style lang="scss" scoped>
.vp-catalog {
  width: 144px;
  .title {
    font-weight: bold;
    margin-bottom: 10px;
  }
  li:not(:last-child) {
    margin-bottom: 10px;
  }
}
.is-active {
  color: var(--el-color-primary);
  // width: 10px;
  // height: 20px;
  // background: #409eff;
  // position: absolute;
}
.vp-catalog {
  position: sticky;
  margin-top: 20px;
  top: 20px;
  z-index: 1;
}
.catalog-marker {
  width: 10px;
  height: 20px;
  background: #409eff;
  position: absolute;
  border-radius: 10px;
  left: -20px;
  transition: all 0.24s;
}
.catalog-container {
  padding: 20px;
  padding-left: 40px;
}
</style>