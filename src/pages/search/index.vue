<template>
  <div class="flex justify-center">
    <div class="max-w-lg w-full pt-14">
      <div class="text-4/8 flex justify-center items-center border-1 border-orange border-solid rounded overflow-hidden">
        <input
          v-model.trim="input"
          type="text"
          class="outline-none leading-8 flex-1 px-2  color-orange border-none dark:(bg-dark-800)"
          @keyup.enter="handleSearchClick"
        >
        <button class="i-carbon:search h-4 w-4 border-none px-5 cursor-pointer flex-none color-orange" @click="handleSearchClick" />
      </div>
      <div>
        <ul class="list-none p-0 space-y-4">
          <li v-for="video in videoList" :key="video.vod_id">
            <MediaItem
              :id="video.vod_id"
              :actor="video.vod_actor"
              :area="video.vod_area"
              :language="video.vod_lang"
              :remark="video.vod_remarks"
              :type="video.type_name"
              :year="video.vod_year"
              :director="video.vod_director"
              :poster="video.vod_pic"
              :name="video.vod_name"
              :description="video.vod_content"
              :score="video.vod_score"
              :sub-name="video.vod_sub"
              @click-play="handlePlayClick"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MediaItem from '@/components/MediaItem.vue'
import type { VideoDetail } from '@/types'

const route = useRoute()
const keyWord = route.query.kw as string
const input = ref(keyWord || '')
const videoList = ref<VideoDetail[]>([])

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
const router = useRouter()
function handlePlayClick(videoId: string) {
  router.push({
    path: `play/${videoId}`,
  })
}
</script>

<style scoped>

</style>
