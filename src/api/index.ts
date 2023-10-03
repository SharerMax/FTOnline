import Providers from './providers'
import type { SupportedProviderName } from './types'
import type { ApiResponse, VideoDetail } from '@/types'

export function queryVideoList(keyword: string, page: number, providerName: SupportedProviderName = 'hdzyk'): Promise<ApiResponse<VideoDetail>> {
  const videoProvider = Providers.of(providerName)
  return videoProvider.queryVideoList(keyword, page)
}

export function queryVideosDetail(ids: string, providerName: SupportedProviderName = 'hdzyk'): Promise<ApiResponse<VideoDetail>> {
  const videoProvider = Providers.of(providerName)
  return videoProvider.queryVideosDetail(ids)
}
