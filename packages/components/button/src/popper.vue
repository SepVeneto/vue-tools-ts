<script lang="ts">
import { defineComponent, h, Fragment, Teleport } from 'vue'

export default defineComponent({
  setup() {

  },
  render() {
    return h(Fragment, null, [
      h('div', 'trigger'),
      h(Teleport as any, { to: 'body' })
    ])
  }
})
</script>