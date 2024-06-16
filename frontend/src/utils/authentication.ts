import { useLogin } from '@/api/auth'
import { computed } from 'vue'
import { useCookieManager } from './cookies'
import router from '@/router'

const cookie = useCookieManager()

export const useAuthCleanup = () => {
  cookie.removeTokenCookie()
  router.push('/login')
}

export const useAuthHook = () => {
  const { mutateAsync: login, isSuccess: isLoginSuccess, isPending, error: loginError } = useLogin()
  const isAuthenticated = computed(() => !isPending.value && Boolean(cookie.getTokenCookie()))

  return {
    login,
    isLoginSuccess,
    isAuthenticated,
    loginError
  }
}
