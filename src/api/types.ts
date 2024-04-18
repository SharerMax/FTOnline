export enum VideoType {
  TV = 1,
  Movie = 2,
  VarietyShow = 3,
  Animation = 4,
  Other = 100,
}

export interface Genre {
  id: number
  name: string
}

export interface VideoGenre {
  id: number
  genre: Genre
  video: Video
}

export interface Poster {
  url: string
  id: number
}

export interface Video {
  id: number

  name: string

  nickName: string

  year: number

  language: string

  area: string

  score: number

  doubanId: string

  director: string

  actors: string

  description: string

  remarks: string

  type: VideoType // 1 电影 2 电视剧 3 综艺 4 动漫

  genres: VideoGenre[]

  poster: Poster[]

  createDateTime?: Date

  updateDateTime?: Date
}

export interface Episode {
  id: number
  name: string
  videoProviderId: number
  url: string
  number: number
}

export interface Provider {
  id: number
  name: string
}

export interface PageResult<T> {
  total: number
  list: T[]
  pageSize: number
  page: number
}
