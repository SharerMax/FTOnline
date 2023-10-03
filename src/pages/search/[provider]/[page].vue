<template>
  <div class="flex justify-center">
    <div class="max-w-lg w-full pt-14 pb-3">
      <div class="text-4/8 flex justify-center items-center border-1 border-orange border-solid rounded overflow-hidden">
        <input
          v-model.trim="input"
          type="text"
          class="outline-none leading-8 flex-1 px-2  color-orange border-none dark:(bg-dark-800)"
          @keyup.enter="handleSearchClick"
        >
        <select v-model="providerName" class="bg-transparent color-orange border-none outline-none px-2">
          <option value="hdzyk">
            高清资源
          </option>
          <option value="xinlang">
            新浪资源
          </option>
        </select>
        <button class="i-carbon:search h-4 w-4 border-none px-5 cursor-pointer flex-none color-orange" @click="handleSearchClick" />
      </div>
      <div>
        <div v-show="loading" class="i-svg-spinners:blocks-shuffle-3 color-orange mx-auto mt-12 w-10 h-10" />
        <div v-show="!loading">
          <ul v-show="!loading" class="list-none p-0 space-y-4">
            <li v-for="video in videoList" :key="video.vod_id">
              <MediaItem
                :id="video.vod_id"
                :actor="video.vod_actor"
                :area="video.vod_area"
                :language="video.vod_lang"
                :remark="video.vod_remarks"
                :type="video.type_name || '未知'"
                :year="video.vod_year"
                :director="video.vod_director"
                :poster="video.vod_pic"
                :name="video.vod_name"
                :score="video.vod_score"
                :sub-name="video.vod_sub"
                @click-play="handlePlayClick"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type { RouteLocationRaw } from 'vue-router/auto'
import MediaItem from '@/components/MediaItem.vue'
import Pagination from '@/components/Pagination.vue'
import type { VideoDetail } from '@/types'
import { queryVideoList } from '@/api'
import type { SupportedProviderName } from '@/api/types'

const route = useRoute('/search/[provider]/[page]')
const keyWord = route.query.kw as string
const page = route.params.page
const providerName = ref(route.params.provider as SupportedProviderName)
const input = ref(keyWord || '')
const videoList = ref<VideoDetail[]>([])
const pagination = reactive({
  page: page ? +page : 1,
  total: 0,
  size: 10,
})
const router = useRouter()

const loading = ref(false)
function searchVideoList(keyword: string, page = 1) {
  loading.value = true
  queryVideoList(keyword, page, providerName.value).then((res) => {
    pagination.total = res.total
    pagination.page = res.page
    pagination.size = +res.limit
    videoList.value = res.list
  }).finally(() => loading.value = false)
}

function updatePage(page: number) {
  const routeLocationRaw: RouteLocationRaw<'/search/[provider]/[page]'> = {
    name: '/search/[provider]/[page]',
    params: {
      provider: providerName.value,
      page: `${page}`,
    },
    query: {
      kw: input.value,
    },
  }
  if (pagination.page === page) {
    router.replace(routeLocationRaw)
  }
  else {
    router.push(routeLocationRaw)
  }

  searchVideoList(input.value, page)
}

function handlePageChange(page: number) {
  updatePage(page)
}

function handleSearchClick() {
  updatePage(1)
}
onMounted(() => {
  searchVideoList(keyWord || '', pagination.page)
})
function handlePlayClick(videoId: string) {
  router.push({
    name: '/play/[provider]/[id]',
    params: {
      provider: providerName.value,
      id: videoId,
    },
  })
}
</script>

<style scoped>

</style>
