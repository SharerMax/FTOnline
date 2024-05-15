<template>
  <div class="w-full shadow shadow-gray rounded overflow-hidden dark:(shadow-orange)">
    <div class="w-full aspect-2/3 relative overflow-hidden">
      <img
        class="block w-full h-full object-cover will-change-transform transition-transform hover:scale-105"
        :src="props.poster"
        :alt="props.name"
        loading="lazy"
      >
      <span class="absolute top-0 left-0 text-3 text-white bg-orange px-2 border-radius-rb-1">{{ props.type }}</span>
      <span v-if="props.remark" class="absolute bottom-0 right-0 text-3 text-white bg-orange  px-2 border-radius-lt-1">{{ props.remark }}</span>
    </div>

    <p class="m-0 mt-2 px-2 text-base truncate" :title="props.name">
      {{ props.name }}
    </p>
    <div class="text-sm opacity-60 px-2 mb-2">
      <span>{{ props.year }}</span>
      <span class="float-right">{{ props.area }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultPoster from '@/assets/img/default-poster.svg?url'

const props = withDefaults(defineProps<{
  name: string
  poster?: string
  year?: number
  type: string
  remark?: string
  area?: string
}>(), {
  poster: defaultPoster,
  type: '其他',
})
</script>

<style scoped>

</style>
