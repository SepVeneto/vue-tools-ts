---
  title: Basic-components
  page: true
---

<script setup>
  console.log('timer start')
  setTimeout(() => {
    if (typeof window !== 'undefined') {
      // window.location.pathname = '/components/table.html'
    }
  }, 5000)
</script>