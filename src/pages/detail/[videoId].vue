<template>
  <div>
    {{ videoId }}
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router/auto'

const route = useRoute('/detail/[videoId]')
const videoId = route.params.videoId
</script>

<style scoped>

</style>
