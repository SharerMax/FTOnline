<template>
  <div class="flex justify-center items-center py-4">
    <div class="max-w-3xl w-full ">
      <h2 class="m-0 mb-4">
        {{ videoDetail?.vod_name }} - {{ videoDetail?.vod_sub }}
      </h2>
      <div id="player" class="w-full aspect-16/9" />
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          v-for="(episode, index) in episodes"
          :key="index"
          class="border-1 border-orange text-orange bg-transparent rounded cursor-pointer mr-2 [&.active]:(bg-orange text-white)"
          :class="{ active: selectedEpisodeIndex === index }"
          @click="handleEpisodeClick(parseEpisode(episode), index)"
        >
          {{ parseEpisode(episode).episodeName }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'
import Artplayer from 'artplayer'
import Hls from 'hls.js'
import type { VideoDetail } from '@/types'

const route = useRoute()
const videoId = route.params.id as string

const videoDetail = ref<VideoDetail | null>(null)
const episodes = computed(() => {
  return videoDetail.value?.vod_play_url.split('#') ?? []
})
function parseEpisode(url: string) {
  const [episodeName, videoUrl] = url.split('$')
  return {
    episodeName,
    videoUrl,
  }
}
async function getVideoDetail(id: string) {
  const res = await axios.get(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(`https://api.1080zyku.com/inc/apijson.php?ac=detail&ids=${id}`)}`)
  if (res.data.list && res.data.list.length > 0) {
    return res.data.list[0] as VideoDetail
  }
  return null
}

let hls: Hls
function playM3u8(video: HTMLMediaElement, url: string, art: Artplayer) {
  if (Hls.isSupported()) {
    if (hls) {
      hls.destroy()
    }
    hls = new Hls()
    hls.loadSource(url)
    hls.attachMedia(video)
    art.on('destroy', () => hls.destroy())
  }
  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = url
  }
  else {
    art.notice.show = 'Unsupported playback format: m3u8'
  }
}
let player: Artplayer | null = null
onMounted(() => {
  player = new Artplayer({
    container: '#player',
    url: '',
    customType: {
      m3u8: playM3u8,
    },
    autoplay: true,
    fullscreen: true,
    playbackRate: true,
    aspectRatio: true,
    setting: true,
    pip: true,
    autoPlayback: true,
    theme: '#fb923c',
  })
  getVideoDetail(videoId).then((detail) => {
    videoDetail.value = detail
    if (episodes.value.length > 0) {
      handleEpisodeClick(parseEpisode(episodes.value[0]), 0)
    }
  })
})
const selectedEpisodeIndex = ref(0)
function handleEpisodeClick(episode: ReturnType<typeof parseEpisode>, index: number) {
  selectedEpisodeIndex.value = index
  console.log(episode)
  if (player) {
    player.url = episode.videoUrl
  }
}
</script>

<style scoped>
</style>
