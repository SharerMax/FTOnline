import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { SupportedProviderKey } from '@/api/types'

export type EpisodeStoreKey = `${SupportedProviderKey}-${string}`
/* #__NO_SIDE_EFFECTS__ */
export function generateStoreKey(providerKey: SupportedProviderKey, videoId: string): EpisodeStoreKey {
  return `${providerKey}-${videoId}`
}

export default defineStore('episode', () => {
  const headerTimes = reactive<Record<EpisodeStoreKey, number>>({})
  const tailTimes = reactive<Record<EpisodeStoreKey, number>>({})

  return { headerTimes, tailTimes }
}, {
  persist: true,
})
