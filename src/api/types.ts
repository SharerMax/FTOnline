import { type } from 'node:os'
import type { ApiResponse, ApiResponseWithClass, VideoBrief, VideoDetail, VideoType } from '@/types'

export type UniversalProviderName = 'hdzyk' | 'xinlang' | 'hongniu' | 'feifan' | 'ikun' | 'shandian' | 'tiankong' | 'liangzi' | 'guangsu'
export type ProviderName = never
export type SupportedProviderName = UniversalProviderName | ProviderName

export interface Provider<Name extends SupportedProviderName = SupportedProviderName> {
  name: Name
  nickName: string
  queryVideoList(keyword: string, page: number, videoType: string): Promise<ApiResponse<VideoDetail>>
  queryVideosDetail(ids: string): Promise<ApiResponse<VideoDetail>>
  queryVideoBriefList(keyword: string, page: number): Promise<ApiResponseWithClass<VideoBrief>>
  queryVideoTypes(): Promise<VideoType[]>
}

export interface Providers {
  of: (name: SupportedProviderName) => Provider
}
