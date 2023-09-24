<template>
  <div class="flex justify-center items-center py-4">
    <div class="max-w-3xl w-full ">
      <h2 class="m-0 mb-4">
        <RouterLink to="/" class="i-carbon-home mr-2 color-orange inline-block vertical-middle" title="首页" />
        {{ videoDetail?.vod_name }} - {{ videoDetail?.vod_sub }}
      </h2>
      <div id="player" class="w-full aspect-16/9" />
      <div class="mt-4 flex">
        <button class="bg-orange color-white rounded border-none py-.5 cursor-pointer" @click="handleEpisodeHeaderTimeSkipSetClick ">
          跳过片头 {{ episodeStore.headerTimes[videoId] ?? 0 }}s
        </button>
        <button class="bg-orange color-white rounded border-none py-.5 cursor-pointer ml-a" @click="handleEpisodeTailTimeSkipSetClick ">
          跳过片尾 {{ episodeStore.tailTimes[videoId] ?? 0 }}s
        </button>
      </div>
      <div>
        <div class="flex items-center text-5">
          <h3>剧集</h3> <button class="cursor-pointer ml-2 inline-block i-carbon-sort-ascending color-orange [&.desc]:(i-carbon-sort-descending color-orange)" :class="{ desc: episodeSort === 'desc' } " @click="handleToggleEpisodeSort" />
        </div>
        <div class="grid grid-cols-8 gap-2">
          <button
            v-for="(episode, index) in episodes"
            :key="index"
            class="border-1 border-orange text-orange  bg-transparent rounded cursor-pointer ![&.active]:(bg-orange text-white border-orange) hover:(border-yellow text-yellow)"
            :class="{ active: selectedEpisodeButtonIndex === index }"
            @click="handleEpisodeClick(episode, index)"
          >
            {{ episode.episodeName }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import axios from 'axios'
import Artplayer from 'artplayer'
import Hls from 'hls.js'
import type { VideoDetail } from '@/types'
import useEpisodeStore from '@/store/useEpisodeStore'

const route = useRoute()
const videoId = route.params.id as string

const episodeSort = ref<'asc' | 'desc'>('asc')
const videoDetail = ref<VideoDetail | null>(null)
const episodes = computed(() => {
  const list = (videoDetail.value?.vod_play_url.split('#') ?? []).map(parseEpisode)
  return episodeSort.value === 'asc' ? list : list.reverse()
})
const episodesCount = computed(() => {
  return episodes.value.length
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
const selectedEpisodeIndex = ref(0)
const episodeStore = useEpisodeStore()
const selectedEpisodeButtonIndex = computed(() => {
  return episodeSort.value === 'asc' ? selectedEpisodeIndex.value : episodesCount.value - 1 - selectedEpisodeIndex.value
})

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
  player.on('video:ended', () => {
    playNextEpisode()
  })

  player.on('ready', () => {
    nextTick(() => {
      skipEpisodeHeader()
    })
  })
  player.on('restart', () => {
    skipEpisodeHeader()
  })

  player.on('video:timeupdate', () => {
    // console.log(event)

    const currentTime = player!.currentTime
    const duration = player!.duration
    const remainTime = duration - currentTime
    const skipTailTime = episodeStore.tailTimes[videoId] ?? 0
    if (player!.duration > 0 && remainTime <= skipTailTime) {
      playNextEpisode()
    }
  })
  getVideoDetail(videoId).then((detail) => {
    videoDetail.value = detail
    if (episodes.value.length > 0) {
      handleEpisodeClick(episodes.value[0], 0)
    }
  })
})
onBeforeUnmount(() => {
  player?.destroy(false)
  player = null
})

function handleToggleEpisodeSort() {
  episodeSort.value = episodeSort.value === 'asc' ? 'desc' : 'asc'
}

function handleEpisodeClick(episode: ReturnType<typeof parseEpisode>, index: number) {
  if (episodeSort.value === 'desc') {
    selectedEpisodeIndex.value = episodesCount.value - 1 - index
  }
  else {
    selectedEpisodeIndex.value = index
  }
  playEpisode(episode)
}

function playEpisode(episode: ReturnType<typeof parseEpisode>) {
  if (player) {
    player.switch = episode.videoUrl
  }
}

function playNextEpisode() {
  if (selectedEpisodeIndex.value < episodesCount.value - 1) {
    selectedEpisodeIndex.value += 1
    playEpisode(episodes.value[selectedEpisodeIndex.value])
  }
}

function skipEpisodeHeader() {
  if (player) {
    player.currentTime = episodeStore.headerTimes[videoId] ?? 0
  }
}

function handleEpisodeHeaderTimeSkipSetClick() {
  episodeStore.headerTimes[videoId] = Math.floor(player?.currentTime || 0)
}

function handleEpisodeTailTimeSkipSetClick() {
  if (player) {
    const remainTime = player.duration - player.currentTime
    episodeStore.tailTimes[videoId] = Math.floor(remainTime)
  }
  else {
    episodeStore.tailTimes[videoId] = 0
  }
}
</script>

<style scoped>
</style>
