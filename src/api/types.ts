import type { ApiResponse, ApiResponseWithClass, VideoBrief, VideoDetail, VideoType } from '@/types'

export type UniversalProviderName = 'hdzyk' | 'xinlang' | 'hongniu' | 'feifan' | 'ikun' | 'shandian' | 'tiankong' | 'liangzi' | 'guangsu'
export type SupportedProviderName = UniversalProviderName

export interface Provider<Name extends SupportedProviderName = SupportedProviderName> {
  name: Name
  queryVideoList: (keyword: string, page: number) => Promise<ApiResponse<VideoDetail>>
  queryVideosDetail: (ids: string) => Promise<ApiResponse<VideoDetail>>
  queryVideoBriefList: (keyword: string, page: number) => Promise<ApiResponseWithClass<VideoBrief>>
  queryVideoTypes: () => Promise<VideoType[]>
}

export interface Providers {
  of: (name: SupportedProviderName) => Provider
}
