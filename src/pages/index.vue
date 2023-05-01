<template>
  <div class=" color-orange-500">
    <div class="w-100 pt-80 mx-auto">
      <h1 class="text-center text-orange m-0">
        FT Online
      </h1>
      <div class="mt-2 flex justify-center items-center border-1  border-orange border-solid rounded overflow-hidden">
        <input
          v-model.trim="input"
          type="text"
          class="color-orange outline-none leading-8 flex-1 px-2 border-none  dark:(bg-dark-800)"
          placeholder="想看啥？"
          @keyup.enter="handleSearchClick"
        >
        <button class="i-carbon:search h-4 w-4 border-none px-5 cursor-pointer color-orange flex-none" @click="handleSearchClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const input = ref('')
const router = useRouter()
function handleSearchClick() {
  router.push({
    path: '/search',
    query: {
      kw: input.value,
    },
  })
}
</script>

<style scoped>

</style>

<route lang="json5">
  {
    "meta": {
      "layout": "default",
      "title": "Home"
    }
  }
</route>
