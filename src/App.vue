/* eslint-disable vue/no-unused-vars */
<template>
  <config-provider>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <bc-table :config="tableConfig" :data="tableData" @save="handleSave">
      <template #operate>
        <bc-button>test</bc-button>
      </template>
    </bc-table>
    <router-view />
  </config-provider>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import configProvider from './components/configProvider';
export default defineComponent({
  components: {
    configProvider,
  },
  setup() {
    const tableConfig = ref([
      { label: 'name', prop: 'name', width: 100 },
      { label: 'age', prop: 'age', editable: true },
      { label: '操作', prop: 'operate' },
    ]);
    const tableData = ref([
      { name: '1', age: '2' },
      { name: '3', age: '4' },
    ]);
    function handleSave(data: any, val: any) {
      console.log(data, val)
    }
    return {
      handleSave,
      tableConfig,
      tableData,
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
