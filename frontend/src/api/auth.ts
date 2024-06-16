import { axiosClient } from '@/utils/axios'
import { useCookieManager } from '@/utils/cookies'
import { useMutation } from '@tanstack/vue-query'
import router from '@/router'

export interface User {
  email?: string
  password: string
  username: string
}

const cookie = useCookieManager()

const onSuccessCb = (data: any) => {
  if (data.data?.access_token) {
    cookie.setTokenCookie(data.data?.access_token)
    router.push('/dashboard')
  }
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ['Login'],
    mutationFn: (variables: Omit<User, 'username'>) =>
      axiosClient.post('/auth/login', { ...variables }),
    onSuccess: onSuccessCb
  })
}

export const useRegister = () => {
  return useMutation({
    mutationKey: ['Register'],
    mutationFn: (variables: User) => axiosClient.post('/auth/register', { ...variables }),
    onSuccess: onSuccessCb
  })
}
