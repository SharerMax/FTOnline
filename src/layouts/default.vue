<template>
  <h2 class="text-center color-orange">
    {{ title }}
  </h2>
  <router-view />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const title = router.currentRoute.value.meta.title
</script>

<style scoped>

</style>
