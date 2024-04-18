import { defineStore } from 'pinia'
import { reactive } from 'vue'

export type EpisodeStoreKey = `${string}-${string}`
/* #__NO_SIDE_EFFECTS__ */
export function generateStoreKey(providerKey: string, videoId: string): EpisodeStoreKey {
  return `${providerKey}-${videoId}`
}

export default defineStore('episode', () => {
  const headerTimes = reactive<Record<EpisodeStoreKey, number>>({})
  const tailTimes = reactive<Record<EpisodeStoreKey, number>>({})

  return { headerTimes, tailTimes }
}, {
  persist: true,
})
