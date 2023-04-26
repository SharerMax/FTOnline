<template>
  <div class=" color-orange-500 ">
    <div class="w-80 mx-auto">
      <div class="pt-14 text-4/8 flex justify-center items-center">
        <input v-model.trim="input" type="text" class="outline-none leading-8 w-80 px-2  color-orange border-1 border-orange rounded dark:(bg-dark-800)">
        <button class="i-carbon:search h-4 w-4 border-none ml-4 cursor-pointer inline-block" @click="handleSearchClick" />
      </div>
      <div class="mt-4">
        <ul class="list-none m-0 p-0 space-y-4">
          <li v-for="item in videoList" :key="item.vod_id">
            <figure class="m-0 p-0  w-full">
              <img :src="item.vod_pic" :alt="item.vod_name" class="w-full">
              <figcaption class="mt-2">
                {{ item.vod_name }}
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const input = ref('')
const videoList = ref<{
  vod_id: string
  vod_name: string
  vod_pic: string
  vod_play_url: string
  vod_remarks: string
}[]>([])
function handleSearchClick() {
  const wd = input.value
  if (wd) {
    axios.get(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(`https://api.1080zyku.com/inc/apijson.php?ac=detail&wd=${input.value}`)}`).then((res) => {
      console.log(res)
      videoList.value = res.data.list
    })
  }
}
</script>

<style scoped>

</style>

<route lang="json5">
  {
    "meta": {
      "title": "Home"
    }
  }
</route>
