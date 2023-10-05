import type { ApiResponse, VideoDetail } from '@/types'

export type UniversalProviderName = 'hdzyk' | 'xinlang' | 'hongniu' | 'feifan' | 'ikun' | 'shandian' | 'tiankong' | 'liangzi' | 'guangsu'
export type SupportedProviderName = UniversalProviderName

export interface Provider<Name extends SupportedProviderName = SupportedProviderName> {
  name: Name
  queryVideoList: (keyword: string, page: number) => Promise<ApiResponse<VideoDetail>>
  queryVideosDetail: (ids: string) => Promise<ApiResponse<VideoDetail>>
}

export interface Providers {
  of: (name: SupportedProviderName) => Provider
}
