<template>
  <div class="text-center ">
    <div class="color-orange-500">
      <input v-model="input" type="text" class="outline-orange"> <button class="i-carbon-search" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const input = ref('')
</script>

<style scoped>

</style>

<route lang="json5">
  {
    "meta": {
      "title": "Home"
    }
  }
</route>
