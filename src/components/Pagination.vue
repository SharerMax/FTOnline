<template>
  <div class="pagination flex justify-center items-center space-x-2">
    <div class="i-carbon:page-first color-orange cursor-pointer" />
    <div
      v-for="pageNum in selectPageButtonCount"
      :key="pageNum"
      class="cursor-pointer px-2 py-1 h-5 leading-3 text-3 border-1 border-orange border-solid rounded hover:bg-orange [&[active]]:bg-orange"
      :active="(pageNum + pageNumStep) === page ? true : null"
      @click="handlePageClick(pageNum + pageNumStep)"
    >
      {{ pageNum + pageNumStep }}
    </div>
    <div class="i-carbon:page-last color-orange cursor-pointer" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  total: number
  page: number
  size: number
}>()
const emits = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const currentPage = computed(() => props.page)
const pageCount = computed(() => {
  return Math.ceil(props.total / props.size)
})
const MAX_PAGE_BUTTON_COUNT = 7
const MAX_HALF_PAGE_BUTTON_COUNT = Math.ceil(MAX_PAGE_BUTTON_COUNT / 2)
const selectPageButtonCount = computed(() => {
  return pageCount.value > MAX_PAGE_BUTTON_COUNT ? MAX_PAGE_BUTTON_COUNT : pageCount.value
})

const pageNumStep = computed(() => {
  if (pageCount.value > MAX_PAGE_BUTTON_COUNT) {
    if (currentPage.value <= MAX_HALF_PAGE_BUTTON_COUNT) {
      return 0
    }
    else {
      const maxCenterPage = pageCount.value - MAX_HALF_PAGE_BUTTON_COUNT
      if (currentPage.value > maxCenterPage) {
        return maxCenterPage - MAX_HALF_PAGE_BUTTON_COUNT
      }
      else {
        return currentPage.value - MAX_HALF_PAGE_BUTTON_COUNT
      }
    }
  }
  else {
    return 0
  }
})

function handlePageClick(page: number) {
  if (page !== props.page) {
    emits('update:page', page)
  }
}
</script>

<style scope>

</style>
