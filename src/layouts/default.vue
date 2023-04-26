<template>
  <router-view class="min-h-screen bg-white dark:bg-dark-950" />
</template>

<script setup lang="ts">
const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
if (darkMediaQuery.matches) {
  document.body.classList.add('dark')
}
else {
  document.body.classList.remove('dark')
}
darkMediaQuery.addEventListener('change', (e) => {
  document.body.classList.toggle('dark')
})
</script>

<style scoped>

</style>
