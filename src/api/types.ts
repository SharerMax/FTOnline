import type { ApiResponse, VideoDetail } from '@/types'

export type SupportedProviderName = 'hdzyk' | 'xinlang'

export type ProviderBaseUrl = {
  [key in SupportedProviderName]: string
}

export interface Provider {
  queryVideoList: (keyword: string, page: number) => Promise<ApiResponse<VideoDetail>>
  queryVideosDetail: (ids: string) => Promise<ApiResponse<VideoDetail>>
}

export interface Providers {
  of: (name: SupportedProviderName) => Provider
}
