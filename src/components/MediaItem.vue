<template>
  <div class="flex">
    <img :src="poster" alt="" class="w-40 aspect-2/3 object-cover flex-none">
    <div class="ml-4 flex flex-col flex-1 overflow-hidden">
      <h2 class="m-0 text-5 truncate" :title="name">
        {{ name }}
      </h2>
      <div class="mt-2">
        <div class="truncate opacity-80 text-sm">
          <span>别名: </span><span>{{ subName }}</span>
        </div>
        <div class="truncate opacity-80 text-sm">
          <span>导演: </span><span>{{ director }}</span>
        </div>
        <div class="truncate opacity-80 text-sm">
          <span>演员: </span><span>{{ actor }}</span>
        </div>
        <div class="truncate opacity-80 text-sm">
          <span>类型: </span><span>{{ type }}</span>
        </div>
        <div class="truncate opacity-80 text-sm">
          <span>语言: </span><span>{{ language }}</span>
        </div>
        <div class="truncate opacity-80 text-sm">
          <span>国家/地区: </span><span>{{ area }}</span>
        </div>
        <div class="truncate opacity-80 text-sm">
          <span>上映: </span><span>{{ year }}</span>
        </div>
        <div class="truncate opacity-80 text-sm">
          <span>评分: </span><span>{{ score }}</span>
        </div>
        <div class="truncate opacity-80 text-sm">
          <span>备注: </span><span>{{ remark }}</span>
        </div>
      </div>
      <div class="mt-a">
        <button class="bg-orange text-white rounded px-4 border-none cursor-pointer flex-none" @click="handlePlayClick">
          播放
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: string
  poster: string
  name: string
  subName: string
  language: string
  area: string
  year: string
  remark: string
  type: string
  director: string
  actor: string
  score: string
}>()
const emits = defineEmits<{
  (e: 'clickPlay', id: string): void
}>()

function handlePlayClick() {
  emits('clickPlay', props.id)
}
</script>

<style scoped>
/* .test {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
} */
</style>
