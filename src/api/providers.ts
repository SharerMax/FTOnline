import axios from 'axios'
import type { Provider, SupportedProviderName } from './types'
import type { ApiResponse, VideoDetail } from '@/types'

const corsProxyClient = axios.create({
  baseURL: 'https://api.codetabs.com/v1/proxy',
})
const HDZYKProvider: Provider = {
  name: 'hdzyk',
  queryVideoList(keyword: string, page: number): Promise<ApiResponse<VideoDetail>> {
    return corsProxyClient.get<ApiResponse<VideoDetail>>('', {
      params: {
        quest: `https://api.1080zyku.com/inc/apijson.php?ac=detail&wd=${keyword}&pg=${page}`,
      },
    }).then(res => res.data)
  },
  queryVideosDetail(ids: string): Promise<ApiResponse<VideoDetail>> {
    return corsProxyClient.get<ApiResponse<VideoDetail>>('', {
      params: {
        quest: `https://api.1080zyku.com/inc/apijson.php?ac=detail&ids=${ids}`,
      },
    }).then(res => res.data)
  },
}

const XinLangProvider: Provider = {
  name: 'xinlang',
  queryVideoList(keyword: string, page: number): Promise<ApiResponse<VideoDetail>> {
    return corsProxyClient.get<ApiResponse<VideoDetail>>('', {
      params: {
        quest: `https://api.xinlangapi.com/xinlangapi.php/provide/vod/from/xlm3u8/?ac=detail&wd=${keyword}&pg=${page}`,
      },
    }).then(res => res.data)
  },
  queryVideosDetail(ids: string): Promise<ApiResponse<VideoDetail>> {
    return corsProxyClient.get<ApiResponse<VideoDetail>>('', {
      params: {
        quest: `https://api.xinlangapi.com/xinlangapi.php/provide/vod/from/xlm3u8/?ac=detail&ids=${ids}`,
      },
    }).then(res => res.data)
  },
}

const Providers = {
  of(name: SupportedProviderName): Provider {
    switch (name) {
      case 'hdzyk': {
        return HDZYKProvider
      }
      case 'xinlang': {
        return XinLangProvider
      }
    }
  },
  isSupportedName(name: string): name is SupportedProviderName {
    return name === 'hdzyk' || name === 'xinlang'
  },
}

export default Providers
