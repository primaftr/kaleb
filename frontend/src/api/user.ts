import { axiosClient } from '@/utils/axios'
import { useQuery } from '@tanstack/vue-query'
import { Ref } from 'vue'

export const useGetUserInfo = (options: { enabled: Ref<boolean> }) => {
  return useQuery({
    queryFn: () => axiosClient.get('/user/me'),
    queryKey: ['UserInfo'],
    refetchOnWindowFocus: false,
    retry: 0,
    ...options
  })
}
