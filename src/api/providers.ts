import axios from 'axios'
import type { Provider, SupportedProviderName, UniversalProviderName } from './types'
import type { ApiResponse, ApiResponseWithClass, VideoBrief, VideoDetail, VideoType } from '@/types'

const corsProxyClient = axios.create({
  // baseURL: 'http://127.0.0.1:8787/api/proxy',
  baseURL: 'https://ft-online.stupidname.tk/api/proxy',
})

class UniversalProvider<T extends UniversalProviderName> implements Provider<T> {
  readonly name: T
  readonly apiUrl: string
  constructor(name: T, apiUrl: string) {
    this.name = name
    this.apiUrl = apiUrl
  }

  queryVideoList(keyword: string, page: number): Promise<ApiResponse<VideoDetail>> {
    return corsProxyClient.get<ApiResponse<VideoDetail>>('', {
      params: {
        url: `${this.apiUrl}?ac=detail&wd=${keyword}&pg=${page}`,
      },
    }).then(res => res.data)
  }

  queryVideosDetail(ids: string): Promise<ApiResponse<VideoDetail>> {
    return corsProxyClient.get<ApiResponse<VideoDetail>>('', {
      params: {
        url: `${this.apiUrl}?ac=detail&ids=${ids}`,
      },
    }).then(res => res.data)
  }

  queryVideoBriefList(keyword: string, page: number): Promise<ApiResponseWithClass<VideoBrief>> {
    return corsProxyClient.get<ApiResponseWithClass<VideoBrief>>('', {
      params: {
        url: `${this.apiUrl}?ac=list&wd=${keyword}&pg=${page}`,
      },
    }).then(res => res.data)
  }

  queryVideoTypes(): Promise<VideoType[]> {
    return this.queryVideoBriefList('', 1).then(res => res.class)
  }
}

function generateUniversalProvider<T extends UniversalProviderName>(name: T, apiUrl: string): Provider<T> {
  return new UniversalProvider(name, apiUrl)
}

// 高清资源 https://www.hdzyk.com/
const HDZYKProvider = generateUniversalProvider('hdzyk', 'https://api.1080zyku.com/inc/apijson.php')
// 新浪资源 https://xinlangzy.com/
const XinLangProvider = generateUniversalProvider('xinlang', 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/from/xlm3u8/')
// 红牛资源 https://hongniuziyuan.com/
const HongNiuProvider = generateUniversalProvider('hongniu', 'https://www.hongniuzy2.com/api.php/provide/vod/from/hnm3u8/')
// 非凡资源 http://ffzy.tv/
const FeiFanProvider = generateUniversalProvider('feifan', 'https://cj.ffzyapi.com/api.php/provide/vod/from/ffm3u8/at/json/')
// iKun 资源 https://ikunzy.com/
const IKunProvider = generateUniversalProvider('ikun', 'https://ikunzyapi.com/api.php/provide/vod/from/ikm3u8/at/json')
// 闪电资源 https://shandianzy.com/
const ShandianProvider = generateUniversalProvider('shandian', 'https://sdzyapi.com/api.php/provide/vod/from/sdm3u8/at/json/')
// 天空资源 https://help.tiankongapi.com/
const TianKongProvider = generateUniversalProvider('tiankong', ' https://api.tiankongapi.com/api.php/provide/vod/from/tkm3u8/at/json/')
// 量子资源 http://lzizy.net/
const LiangZiProvier = generateUniversalProvider('liangzi', 'https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8/at/json/')
// 光速资源 https://www.guangsuzy.com/
const GuangSuProvider = generateUniversalProvider('guangsu', 'https://api.guangsuapi.com/api.php/provide/vod/from/gsm3u8/')

const Providers = {
  of(name: SupportedProviderName): Provider {
    switch (name) {
      case 'hdzyk': {
        return HDZYKProvider
      }
      case 'xinlang': {
        return XinLangProvider
      }
      case 'hongniu': {
        return HongNiuProvider
      }
      case 'feifan': {
        return FeiFanProvider
      }
      case 'ikun': {
        return IKunProvider
      }
      case 'shandian': {
        return ShandianProvider
      }
      case 'tiankong': {
        return TianKongProvider
      }
      case 'liangzi': {
        return LiangZiProvier
      }
      case 'guangsu': {
        return GuangSuProvider
      }
    }
  },

  isSupportedName(name: string): name is SupportedProviderName {
    return name === 'hdzyk' || name === 'xinlang' || name === 'hongniu' || name === 'feifan' || name === 'ikun' || name === 'shandian' || name === 'tiankong' || name === 'lianzi'
  },
}

export default Providers
