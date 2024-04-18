import client from './client'
import type { Episode, Genre, PageResult, Provider, Video, VideoType } from './types'

export async function getVideoDetail(id: number) {
  return await client.get<Video>(`/video/detail/${id}`)
}

export async function getVideoListPage(page: number, name?: string, type?: VideoType, genreId?: number) {
  return await client.get<PageResult<Video>>('/video/list', {
    params: {
      page,
      name,
      genre: genreId,
      type,
    },
  })
}

export async function getVideoGenres() {
  return await client.get<Genre[]>('/genre/list')
}

export async function getVideoEpisode(videoId: number, providerId: number) {
  return await client.get<Episode[]>('/video/episode', {
    params: {
      videoId,
      providerId,
    },
  })
}

export async function getProviderByVideo(videoId: number) {
  return await client.get<Provider[]>(`/provider/video/${videoId}`)
}
