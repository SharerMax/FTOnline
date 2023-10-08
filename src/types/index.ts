export interface VideoDetail {
  vod_id: string | number
  vod_name: string
  vod_sub: string
  vod_pic: string
  vod_play_url: string
  vod_remarks: string
  vod_content: string
  vod_actor: string
  vod_director: string
  vod_lang: string
  vod_area: string
  vod_year: string
  vod_score: string
  type_name?: string
  type_id: string
}

export interface ApiResponse<T> {
  code: number
  limit: number | string
  page: number | string
  pageCount: number
  total: number
  msg: string
  list: T[]
}

export interface ApiResponseWithClass<T> extends ApiResponse<T> {
  class: VideoType[]
}

export interface VideoBrief {
  vod_id: string
  vod_name: string
  type_id: string
  type_name: string
  vod_en: string
  vod_time: string
  vod_remarks: string
  vod_play_from: string
}

export interface VideoType {
  type_id: string
  type_name: string
  type_pid?: string
}
