<template>
  <div class="flex justify-center px-4">
    <div class="max-w-7xl w-full pt-14 pb-3">
      <div class="text-center color-orange">
        <a href="/" class="text-6 color-orange decoration-none flex-inline items-center"><span class="i-ft-logo inline-block mr-2" /> FT Online</a>
      </div>
      <div class="text-4/8 mt-2 flex justify-center items-center border-1 border-orange border-solid rounded overflow-hidden">
        <input
          v-model.trim="input"
          type="text"
          class="outline-none leading-8 flex-1 px-2  color-orange border-none dark:(bg-dark-800)"
          @keyup.enter="handleSearchClick"
        >
        <select v-model="videoType" class="bg-transparent color-orange border-none outline-none px-2">
          <option v-for="(type, index) in videoTypes" :key="index" :value="type">
            {{ videoTypeNames[type] }}
          </option>
        </select>
        <select v-model="selectedGenreId" class="bg-transparent color-orange border-none outline-none px-2">
          <option value="">
            所有
          </option>
          <option v-for="(genre) in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
        <button class="i-carbon:search h-4 w-4 border-none px-5 cursor-pointer flex-none color-orange" @click="handleSearchClick" />
      </div>
      <div>
        <div v-show="loading" class="i-svg-spinners:blocks-shuffle-3 color-orange mx-auto mt-12 w-10 h-10" />
        <div v-show="!loading">
          <template v-if="videoList.length > 0">
            <ul class="list-none p-0 grid grid-cols-auto-40 md:(grid-cols-auto-50) gap-4 justify-around">
              <li v-for="video in videoList" :key="video.id">
                <SimpleMediaItem
                  :name="video.name"
                  class="cursor-pointer"
                  :poster="video.poster[0].url"
                  :year="video.year"
                  :type="videoTypeNames[video.type]"
                  :remark="video.remarks"
                  :area="video.area"
                  @click="handlePlayClick(video.id)"
                />
              </li>
            </ul>
            <Pagination
              :page="pagination.page"
              :total="pagination.total"
              :size="pagination.size"
              class="mt-3"
              @update:page="handlePageChange"
            />
          </template>
          <div v-else class="flex  justify-center items-center mt-16 text-5 color-orange">
            <div class="i-gridicons-notice-outline mr-2" /> <span>未找到资源</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router/auto'

import type { RouteLocationRaw } from 'vue-router/auto'
import { getVideoGenres, getVideoListPage } from '@/api'
import { type Genre, type Video, VideoType } from '@/api/types'
import Pagination from '@/components/Pagination.vue'
import SimpleMediaItem from '@/components/SimpleMediaItem.vue'

const route = useRoute('/search/[page]')
const keyWord = (route.query.kw || '') as string
const videoType = ref((route.query.type || '') as string)
const selectedGenreId = ref((route.query.genre || '') as string)
const genres = ref<Genre[]>([])
const selectedGenre = computed(() => {
  if (selectedGenreId.value) {
    return genres.value.find(genre => genre.id.toString() === selectedGenreId.value)
  }
  else {
    return {
      id: undefined,
      name: '全部',
    }
  }
})
const page = route.params.page

const videoTypesAll = ''
const videoTypes: (typeof videoTypesAll | VideoType)[] = [videoTypesAll, VideoType.TV, VideoType.Movie, VideoType.VarietyShow, VideoType.Animation, VideoType.Other]
const selectedVideoType = computed(() => {
  if (videoType.value) {
    return Number.parseInt(videoType.value) as VideoType
  }
  else {
    return undefined
  }
})
const videoTypeNames: Record<VideoType | typeof videoTypesAll, string> = {
  [videoTypesAll]: '全部',
  [VideoType.TV]: '电视剧',
  [VideoType.Movie]: '电影',
  [VideoType.VarietyShow]: '综艺',
  [VideoType.Animation]: '动漫',
  [VideoType.Other]: '其它',
}
const input = ref(keyWord || '')
const videoList = ref<Video[]>([])
const pagination = reactive({
  page: page ? +page : 1,
  total: 0,
  size: 10,
})
const router = useRouter()

async function updateGenres() {
  const res = await getVideoGenres()
  genres.value = res
}

const loading = ref(false)
function searchVideoList(page: number, keyword: string) {
  loading.value = true
  getVideoListPage(page, keyword, selectedVideoType.value, selectedGenre.value?.id).then((res) => {
    pagination.total = res.total
    pagination.page = +res.page
    pagination.size = +res.pageSize
    videoList.value = res.list
  }).finally(() => loading.value = false)
}

function updatePage(page: number) {
  const routeLocationRaw: RouteLocationRaw<'/search/[page]'> = {
    name: '/search/[page]',
    params: {
      page: `${page}`,
    },
    query: {
      kw: input.value,
      type: selectedVideoType.value,
      genre: selectedGenre.value?.id,
    },
  }
  console.log(selectedGenre.value, selectedVideoType.value, videoType.value)
  if (pagination.page === page) {
    router.replace(routeLocationRaw)
  }
  else {
    router.push(routeLocationRaw)
  }

  searchVideoList(page, input.value)
}

function handlePageChange(page: number) {
  updatePage(page)
}

function handleSearchClick() {
  updatePage(1)
}
onMounted(() => {
  updateGenres().then(() => {
    searchVideoList(pagination.page, keyWord || '')
  })
})

function handlePlayClick(videoId: number) {
  router.push({
    name: '/play/[videoId]/[episode]',
    params: {
      videoId,
      episode: 1,
    },
  })
}
</script>

<style scoped>

</style>
