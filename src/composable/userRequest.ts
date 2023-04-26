import { type Ref, ref } from 'vue'

export interface Response<T, E = unknown> {
  loading: Ref<boolean>
  data: Ref<T | undefined>
  error: Ref<E | undefined>
}

export function useRequest<T, E = unknown>(requestFn: () => Promise<T>): Response<T, E>
export function useRequest<T, E = unknown>(request: Promise<T> | (() => Promise<T>)): Response<T, E> {
  const loading = ref(true)
  const data = ref<T>()
  const error = ref<E>()
  const promiseReq = typeof request === 'function' ? request() : request
  promiseReq.then((res) => {
    data.value = res
  }).catch(reason => error.value = reason).finally(() => loading.value = false)
  return {
    loading,
    data,
    error,
  }
}
