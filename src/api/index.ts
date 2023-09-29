import Providers from './providers'
import type { ApiResponse, VideoDetail } from '@/types'

export function queryVideoList(keyword: string, page: number): Promise<ApiResponse<VideoDetail>> {
  const videoProvider = Providers.of('hdzyk')
  return videoProvider.queryVideoList(keyword, page)
}

export function queryVideosDetail(ids: string): Promise<ApiResponse<VideoDetail>> {
  const videoProvider = Providers.of('hdzyk')
  return videoProvider.queryVideosDetail(ids)
}
