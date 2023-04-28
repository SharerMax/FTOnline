<template>
  <div class="flex justify-center">
    <div class="max-w-lg w-full">
      <div class="pt-14 text-4/8 flex justify-center items-center">
        <input v-model.trim="input" type="text" class="outline-none leading-8 flex-1 px-2  color-orange border-1 border-orange rounded dark:(bg-dark-800)">
        <button class="i-carbon:search h-4 w-4 border-none ml-4 cursor-pointer flex-none color-orange" @click="handleSearchClick" />
      </div>
      <div>
        <ul class="list-none p-0 space-y-4">
          <li v-for="video in videoList" :key="video.vod_id">
            <MediaItem :poster="video.vod_pic" :name="video.vod_name" :description="video.vod_content" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MediaItem from '@/components/MediaItem.vue'

const route = useRoute()
const keyWord = route.query.kw as string
const input = ref(keyWord || '')
const videoList = ref<{
  vod_id: string
  vod_name: string
  vod_pic: string
  vod_play_url: string
  vod_remarks: string
  vod_content: string
}[]>([])

function searchVideoList(keyword: string) {
  axios.get(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(`https://api.1080zyku.com/inc/apijson.php?ac=detail&wd=${keyword}`)}`).then((res) => {
    console.log(res)
    videoList.value = res.data.list
  })
}

function handleSearchClick() {
  const wd = input.value
  if (wd) {
    searchVideoList(wd)
  }
}
onMounted(() => {
  if (keyWord) {
    searchVideoList(keyWord || '')
  }
})
</script>

<style scoped>

</style>
