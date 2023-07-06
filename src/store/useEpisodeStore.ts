import { defineStore } from 'pinia'
import { reactive } from 'vue'

export default defineStore('episode', () => {
  const headerTimes = reactive<Record<string, number>>({})
  const tailTimes = reactive<Record<string, number>>({})

  return { headerTimes, tailTimes }
}, {
  persist: true,
})
