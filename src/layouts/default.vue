<template>
  <router-view class="min-h-screen bg-white text-black dark:(bg-dark-900 text-white)" />
</template>

<script setup lang="ts">
const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
if (darkMediaQuery.matches) {
  document.body.classList.add('dark')
}
else {
  document.body.classList.remove('dark')
}
darkMediaQuery.addEventListener('change', (_) => {
  document.body.classList.toggle('dark')
})
</script>

<style scoped>

</style>
