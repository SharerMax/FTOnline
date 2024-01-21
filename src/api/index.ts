import Providers from './providers'
import type { SupportedProviderKey } from './types'
import type { ApiResponse, VideoDetail, VideoType } from '@/types'

export function queryVideoList(keyword: string, page: number, videoType: string, providerKey: SupportedProviderKey): Promise<ApiResponse<VideoDetail>> {
  const videoProvider = Providers.noNullOf(providerKey)
  return videoProvider.queryVideoList(keyword, page, videoType)
}

export function queryVideosDetail(ids: string, providerKey: SupportedProviderKey): Promise<ApiResponse<VideoDetail>> {
  const videoProvider = Providers.noNullOf(providerKey)
  return videoProvider.queryVideosDetail(ids)
}

export function queryVideoTypes(providerKey: SupportedProviderKey): Promise<VideoType[]> {
  const videoProvider = Providers.noNullOf(providerKey)
  return videoProvider.queryVideoTypes()
}
