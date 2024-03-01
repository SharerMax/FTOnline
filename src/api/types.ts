import type { ApiResponse, ApiResponseWithClass, VideoBrief, VideoDetail, VideoType } from '@/types'

export type UniversalProviderKey = string
export type ProviderKey = never
export type SupportedProviderKey = UniversalProviderKey | ProviderKey

export interface Provider<Key extends SupportedProviderKey = SupportedProviderKey> {
  key: Key
  name: string
  queryVideoList: (keyword: string, page: number, videoType: string) => Promise<ApiResponse<VideoDetail>>
  queryVideosDetail: (ids: string) => Promise<ApiResponse<VideoDetail>>
  queryVideoBriefList: (keyword: string, page: number) => Promise<ApiResponseWithClass<VideoBrief>>
  queryVideoTypes: () => Promise<VideoType[]>
}

export interface Providers {
  of: (providerKey: SupportedProviderKey) => Provider
}
