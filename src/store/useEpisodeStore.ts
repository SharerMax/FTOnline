import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { SupportedProviderName } from '@/api/types'

export type EpisodeStoreKey = `${SupportedProviderName}-${string}`
/* #__NO_SIDE_EFFECTS__ */
export function generateStoreKey(providerName: SupportedProviderName, videoId: string): EpisodeStoreKey {
  return `${providerName}-${videoId}`
}

export default defineStore('episode', () => {
  const headerTimes = reactive<Record<EpisodeStoreKey, number>>({})
  const tailTimes = reactive<Record<EpisodeStoreKey, number>>({})

  return { headerTimes, tailTimes }
}, {
  persist: true,
})
