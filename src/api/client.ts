import axios, { type AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

async function get<T = any>(url: string, config?: AxiosRequestConfig) {
  return await request<T>({ ...config, url, method: 'get' })
}

async function request<T = any>(config: AxiosRequestConfig) {
  return await instance.request<T>(config).then(res => res.data)
}
export default {
  get,
  request,
}
