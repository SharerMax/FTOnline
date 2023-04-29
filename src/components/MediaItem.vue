<template>
  <div class="flex">
    <img :src="poster" alt="" class="w-40 aspect-2/3 object-cover flex-none">
    <div class="ml-4">
      <h2 class="m-0 text-5 ">
        {{ name }}
      </h2>
      <p class="m-0 line-clamp-2">
        {{ description }}
      </p>
      <button class="bg-orange text-white rounded px-4 border-none cursor-pointer" @click="handlePlayClick">
        播放
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  poster: string
  name: string
  description: string
}>()
const emits = defineEmits<{
  (e: 'clickPlay', id: string): void
}>()

function handlePlayClick() {
  emits('clickPlay', props.id)
}
</script>

<style  scoped>

</style>
