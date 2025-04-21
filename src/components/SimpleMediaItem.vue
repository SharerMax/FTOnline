<template>
  <div class="w-full shadow-sm shadow-gray rounded overflow-hidden dark:(shadow-none)">
    <div class="w-full aspect-2/3 relative overflow-hidden dark:bg-dark-800">
      <img
        class="block w-full h-full object-cover will-change-transform transition-transform hover:scale-105"
        :src="poster.url"
        :alt="props.name"
        loading="lazy"
        @error="handlePostImgError"
      >
      <span class="absolute top-0 left-0 text-3 text-white line-height-5 bg-rose-500 px-2 border-radius-rb-1">{{ props.type }}</span>
      <span v-if="props.remark" class="absolute bottom-0 right-0 text-3 text-white line-height-5 bg-blue-500  px-2 border-radius-lt-1 truncate max-w-full">{{ props.remark }}</span>
    </div>
    <div class="h-1px bg-gray-1" />
    <div class="p-2 dark:(bg-dark-500)">
      <p class="m-0 text-base truncate" :title="props.name">
        {{ props.name }}
      </p>
      <div class="text-sm opacity-60 dark:bg-op-10">
        <span>{{ props.year }}</span>
        <span class="float-right">{{ props.area }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import defaultPoster from '@/assets/img/default-poster.svg?url'
import { reactive, watch } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  poster?: string | string[]
  year?: number
  type: string
  remark?: string
  area?: string
}>(), {
  poster: defaultPoster,
  type: '其他',
})

const poster = reactive<{
  url: string
  index: number
}>({
  url: defaultPoster,
  index: 0,
})
watch(() => props.poster, (newVal) => {
  if (typeof newVal === 'string') {
    poster.index = 0
    poster.url = newVal
  }
  else {
    poster.index = 0
    poster.url = newVal[0]
  }
})
function handlePostImgError() {
  if (Array.isArray(props.poster)) {
    if (poster.index < props.poster.length - 1) {
      poster.index++
      poster.url = props.poster[poster.index]
    }
    else {
      poster.url = defaultPoster
    }
  }
  else {
    poster.url = defaultPoster
  }
}
</script>

<style scoped>

</style>
