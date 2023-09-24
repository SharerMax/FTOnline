<template>
  <div class=" color-orange-500">
    <div class="w-100 pt-80 mx-auto">
      <h1 class="flex justify-center items-center text-orange m-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 20 20"
          class="mr-4"
        >
          <g fill="#FC923D">
            <path d="M4 5h12v7H4V5Z" />
            <path fill-rule="evenodd" d="M1 3.5A1.5 1.5 0 0 1 2.5 2h15A1.5 1.5 0 0 1 19 3.5v10a1.5 1.5 0 0 1-1.5 1.5H12v1.5h3.25a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1 0-1.5H8V15H2.5A1.5 1.5 0 0 1 1 13.5v-10Zm16.5 0h-15v10h15v-10Z" clip-rule="evenodd" />
          </g>
        </svg>
        FT Online
      </h1>
      <div class="mt-2 flex justify-center items-center border-1  border-orange border-solid rounded overflow-hidden">
        <input
          v-model.trim="input"
          v-focus
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
import svg from '@/assets/img/logo.svg?raw'

console.log(svg)
const input = ref('')
const router = useRouter()
function handleSearchClick() {
  router.push({
    path: '/search/1',
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
