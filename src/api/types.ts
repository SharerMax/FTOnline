import type { ApiResponse, VideoDetail } from '@/types'

export type SupportedProviderName = 'hdzyk' | 'xinlang'

export interface Provider {
  name: SupportedProviderName
  queryVideoList: (keyword: string, page: number) => Promise<ApiResponse<VideoDetail>>
  queryVideosDetail: (ids: string) => Promise<ApiResponse<VideoDetail>>
}

export interface Providers {
  of: (name: SupportedProviderName) => Provider
}
