import Providers from './providers'
import type { SupportedProviderName } from './types'
import type { ApiResponse, VideoDetail, VideoType } from '@/types'

export function queryVideoList(keyword: string, page: number, videoType: string, providerName: SupportedProviderName = 'hdzyk'): Promise<ApiResponse<VideoDetail>> {
  const videoProvider = Providers.of(providerName)
  return videoProvider.queryVideoList(keyword, page, videoType)
}

export function queryVideosDetail(ids: string, providerName: SupportedProviderName = 'hdzyk'): Promise<ApiResponse<VideoDetail>> {
  const videoProvider = Providers.of(providerName)
  return videoProvider.queryVideosDetail(ids)
}

export function queryVideoTypes(providerName: SupportedProviderName = 'hdzyk'): Promise<VideoType[]> {
  const videoProvider = Providers.of(providerName)
  return videoProvider.queryVideoTypes()
}
