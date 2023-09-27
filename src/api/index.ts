import axios from 'axios'
import type { ApiResponse, VideoDetail } from '@/types'

const httpClient = axios.create({
  baseURL: 'https://api.codetabs.com/v1/proxy',
})

function generateVideoListUrl(keyword: string, page: number) {
  return `https://api.1080zyku.com/inc/apijson.php?ac=detail&wd=${keyword}&pg=${page}`
}

export function queryVideoList(keyword: string, page: number): Promise<ApiResponse<VideoDetail>> {
  return httpClient.get<ApiResponse<VideoDetail>>('', {
    params: {
      quest: generateVideoListUrl(keyword, page),
    },
  }).then((res) => {
    return res.data
  })
}
