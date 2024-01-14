<template>
  <div class="flex justify-center items-center py-4">
    <div class="max-w-3xl w-full ">
      <h2 class="m-0 mb-4">
        <RouterLink to="/" class="i-carbon-home mr-2 color-orange inline-block vertical-middle" title="首页" />
        {{ videoDetail?.vod_name }} - {{ videoDetail?.vod_sub }}
      </h2>
      <div id="player" class="w-full aspect-16/9" />
      <div class="mt-4 flex">
        <div class="bg-orange rounded p-2 flex items-center">
          <button class="  bg-transparent border-none p-0  cursor-pointer  color-white" @click="handleEpisodeHeaderTimeSkipSetClick ">
            跳过片头 {{ episodeStore.headerTimes[episodeStoreKey] ?? 0 }}s
          </button>
          <div class="bg-gray-200 h-4 w-px mx-2" />
          <button class="i-lucide-timer-reset p-0 border-none inline-block cursor-pointer color-white" @click="handleEpisodeHeaderTimeSkipResetClick" />
        </div>
        <div class="ml-a bg-orange rounded p-2 flex items-center ">
          <button class="  bg-transparent border-none p-0  cursor-pointer color-white" @click="handleEpisodeTailTimeSkipSetClick ">
            跳过片尾 {{ episodeStore.tailTimes[episodeStoreKey] ?? 0 }}s
          </button>
          <div class="bg-gray-200 h-4 w-px mx-2" />
          <button class="i-lucide-timer-reset p-0 border-none inline-block cursor-pointer color-white" @click="handleEpisodeTailTimeSkipResetClick" />
        </div>
      </div>
      <div>
        <div class="flex items-center text-5">
          <h3>剧集</h3> <button class="cursor-pointer ml-2 inline-block i-carbon-sort-ascending color-orange [&.desc]:(i-carbon-sort-descending color-orange)" :class="{ desc: episodeSort === 'desc' } " @click="handleToggleEpisodeSort" />
        </div>
        <div class="grid grid-cols-8 gap-2">
          <button
            v-for="(episode, index) in episodesForButton"
            :key="index"
            class="btn ![&.active]:(bg-orange text-white border-orange)"
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Artplayer from 'artplayer'
import Hls from 'hls.js'
import { debounce } from 'throttle-debounce'
import type { ComponentOption } from 'artplayer/types/component'
import { onBeforeRouteLeave, useRouter } from 'vue-router/auto'
import type { VideoDetail } from '@/types'
import useEpisodeStore, { generateStoreKey } from '@/store/useEpisodeStore'
import { queryVideosDetail } from '@/api'
import type { SupportedProviderName } from '@/api/types'

const route = useRoute('/play/[provider]/[videoId]/[episode]')
const router = useRouter()

const videoId = route.params.videoId
const providerName = route.params.provider as SupportedProviderName
const episodeStoreKey = generateStoreKey(providerName, videoId)
const episodeNum = computed(() => Number.parseInt(route.params.episode))
const episodeSort = ref<'asc' | 'desc'>('asc')
const videoDetail = ref<VideoDetail | null>(null)
const episodes = computed(() => {
  return (videoDetail.value?.vod_play_url.split('#') ?? []).map(parseEpisode)
})
const episodesForButton = computed(() => {
  return episodeSort.value === 'asc' ? episodes.value : episodes.value.toReversed()
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
  const res = await queryVideosDetail(id, providerName)
  if (res.list && res.list.length > 0) {
    return res.list[0] as VideoDetail
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
const selectedEpisodeIndex = computed(() => {
  return episodeNum.value - 1
})
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
    autoOrientation: true,
    controls: [
      {
        name: 'previous-button',
        index: 100,
        position: 'left',
        html: '<i class="i-ic-round-skip-previous w-7 h-7">',
        tooltip: '上一集',
        click() {
          playPreviousEpisode()
        },
      },
      {
        name: 'next-button',
        index: 101,
        position: 'left',
        html: '<i class="i-ic-round-skip-next w-7 h-7">',
        tooltip: '下一集',
        style: {
        },
        click() {
          playNextEpisode()
        },
      },
      // {
      //   name: 'play-list',
      //   position: 'right',
      //   html: '<i class="i-ic-round-playlist-play w-7 h-7 block">',
      //   tooltip: '剧集',
      // },
    ],
  })
  player.on('video:ended', () => {
    playNextEpisode()
  })
  // player.on('video:loadedmetadata', () => {
  //   console.log('video:loadedmetadata')
  // })
  player.on('ready', () => {
    nextTick(() => {
      skipEpisodeHeader()
    })
  })
  player.on('restart', () => {
    skipEpisodeHeader()
  })
  const playNext = debounce(3000, () => {
    // console.log('playNext')
    playNextEpisode()
  }, {
    atBegin: true,
  })
  player.on('video:timeupdate', () => {
    // console.log(player!.currentTime)

    const currentTime = player!.currentTime
    const duration = player!.duration
    const remainTime = duration - currentTime
    const skipTailTime = episodeStore.tailTimes[episodeStoreKey] ?? 0
    if (skipTailTime > 0 && player!.duration > 0 && remainTime <= skipTailTime) {
      // console.log(player!.currentTime, remainTime, skipTailTime)
      playNext()
    }
  })
  getVideoDetail(videoId).then((detail) => {
    videoDetail.value = detail
    if (episodes.value.length > 0) {
      if (episodeNum.value > episodes.value.length) {
        router.push('/404')
      }
      playEpisode(episodes.value[selectedEpisodeIndex.value])
      updateEpisodeControl(episodes.value[selectedEpisodeIndex.value])
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
  let jumpEpisodeNum = index + 1
  switch (episodeSort.value) {
    case 'asc':
      jumpEpisodeNum = index + 1
      break
    case 'desc':
      jumpEpisodeNum = episodesCount.value - index
      break
  }
  router.push({
    name: '/play/[provider]/[videoId]/[episode]',
    params: {
      provider: providerName,
      videoId,
      episode: jumpEpisodeNum,
    },
  })
}

function updateEpisodeControl(episode: ReturnType<typeof parseEpisode>) {
  if (player) {
    const episodeControl: ComponentOption = {
      name: 'episode',
      html: episode.episodeName,
      position: 'right',
    }
    if (player.controls.episode) {
      player.controls.update(episodeControl)
    }
    else {
      player.controls.add(episodeControl)
    }
  }
}

function playEpisode(episode: ReturnType<typeof parseEpisode>) {
  if (player) {
    player.switch = episode.videoUrl
  }
}

const unSelectedEpisodeIndexWatch = watch(selectedEpisodeIndex, (newVal) => {
  if (!Number.isNaN(newVal)) {
    playEpisode(episodes.value[newVal])
    updateEpisodeControl(episodes.value[newVal])
  }
})

onBeforeRouteLeave(() => {
  unSelectedEpisodeIndexWatch()
})

function isLastEpisode() {
  return episodeNum.value === episodesCount.value
}

function isFirstEpisode() {
  return episodeNum.value === 1
}

function playNextEpisode() {
  if (!isLastEpisode()) {
    router.push({
      name: '/play/[provider]/[videoId]/[episode]',
      params: {
        provider: providerName,
        videoId,
        episode: episodeNum.value + 1,
      },
    })
  }
}

function playPreviousEpisode() {
  if (!isFirstEpisode()) {
    router.push({
      name: '/play/[provider]/[videoId]/[episode]',
      params: {
        provider: providerName,
        videoId,
        episode: episodeNum.value - 1,
      },
    })
  }
}

function skipEpisodeHeader() {
  if (player) {
    player.currentTime = episodeStore.headerTimes[episodeStoreKey] ?? 0
  }
}

function handleEpisodeHeaderTimeSkipSetClick() {
  episodeStore.headerTimes[episodeStoreKey] = Math.floor(player?.currentTime || 0)
}
function handleEpisodeHeaderTimeSkipResetClick() {
  episodeStore.headerTimes[episodeStoreKey] = 0
}
function handleEpisodeTailTimeSkipSetClick() {
  if (player) {
    const remainTime = player.duration - player.currentTime
    episodeStore.tailTimes[episodeStoreKey] = Math.floor(remainTime)
  }
  else {
    episodeStore.tailTimes[episodeStoreKey] = 0
  }
}
function handleEpisodeTailTimeSkipResetClick() {
  episodeStore.tailTimes[episodeStoreKey] = 0
}
</script>

<style scoped>
</style>
