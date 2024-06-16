import axios from 'axios'
import { ref } from 'vue'
import { useCookieManager } from './cookies'
import { useAuthCleanup } from './authentication'

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const cookie = useCookieManager()

export const setupAxiosInterceptor = () => {
  axiosClient.interceptors.request.use(function (config) {
    const token = cookie.getTokenCookie()
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
  })
  // Unauthenticated/forbidden interceptor
  axiosClient.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      if (err.response.status === 401) {
        useAuthCleanup()
      }
      return Promise.reject(err.response?.data?.message)
    }
  )
}
