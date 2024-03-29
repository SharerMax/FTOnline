import axios from 'axios'
import type { Provider, SupportedProviderKey, UniversalProviderKey } from './types'
import universalProvidersConfig from './universalProviders.config.json'
import type { ApiResponse, ApiResponseWithClass, VideoBrief, VideoDetail, VideoType } from '@/types'

const baseURLWithHttps = import.meta.env.VITE_PROVIDER_PROXY_API_URL
const baseURLWithHttp = import.meta.env.VITE_PROVIDER_PROXY_API_URL.replace('https', 'http')
const baseURL = window.location.protocol.toLowerCase() === 'http' ? baseURLWithHttp : baseURLWithHttps
const corsProxyClient = axios.create({
  baseURL,
})

class UniversalProvider<T extends UniversalProviderKey> implements Provider<T> {
  readonly key: T
  readonly apiUrl: string
  readonly name: string
  constructor(name: T, apiUrl: string, nickName: string = '') {
    this.key = name
    this.apiUrl = apiUrl
    this.name = nickName
  }

  queryVideoList(keyword: string, page: number, videoType: string): Promise<ApiResponse<VideoDetail>> {
    return corsProxyClient.get<ApiResponse<VideoDetail>>('', {
      params: {
        url: `${this.apiUrl}?ac=detail&wd=${keyword}&pg=${page}&t=${videoType}`,
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

function generateUniversalProvider<T extends UniversalProviderKey>(name: T, apiUrl: string, nickName: string): Provider<T> {
  return new UniversalProvider(name, apiUrl, nickName)
}

const universalProviders: { [key: string]: Provider } = {}

universalProvidersConfig.filter(provider => provider.enable).forEach((provider) => {
  universalProviders[provider.key] = generateUniversalProvider(provider.key, provider.apiUrl, provider.name)
})
const Providers = {
  of(providerKey: SupportedProviderKey): Provider | undefined {
    if (Providers.isSupportedProvider(providerKey)) {
      return universalProviders[providerKey]
    }
  },
  noNullOf(providerKey: SupportedProviderKey): Provider {
    const provider = Providers.of(providerKey)
    if (!provider) {
      throw new Error(`provider ${providerKey} not found`)
    }
    return provider
  },
  all(): Provider<SupportedProviderKey>[] {
    return Object.values(universalProviders)
  },

  isSupportedProvider(providerKey: string) {
    return Object.keys(universalProviders).includes(providerKey)
  },
}

export default Providers
