<template>
  <div class="pagination flex justify-center items-center space-x-2">
    <div
      v-for="pageNum in pageCount"
      :key="pageNum"
      class="cursor-pointer px-2 py-1 h-5 leading-3 text-3 border-1 border-orange border-solid rounded hover:bg-orange [&[active]]:bg-orange"
      :active="pageNum === page ? true : null"
      @click="handlePageClick(pageNum)"
    >
      {{ pageNum }}
    </div>
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

const pageCount = computed(() => {
  return Math.ceil(props.total / props.size)
})

function handlePageClick(page: number) {
  if (page !== props.page) {
    emits('update:page', page)
  }
}
</script>

<style scope>

</style>
