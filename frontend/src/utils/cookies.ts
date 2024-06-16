import Cookies from 'js-cookie'

import { ref } from 'vue'

const jsCookieConfig: Cookies.CookieAttributes = {
  domain: import.meta.env.domain,
  ...(window.location.hostname === 'localhost' && { domain: 'localhost' }),
  expires: 30,
  path: '/',
  secure: window.location.hostname !== 'localhost',
  sameSite: 'Strict'
}

export const jsCookies = Cookies.withAttributes(jsCookieConfig)

const tokenRef = ref<string>()

const doesCookieExist = (cookieName: string): boolean => {
  return !!jsCookies.get(cookieName)
}

const getTokenCookie = (): string | undefined => {
  const tokenCookie = jsCookies.get('token')
  if (tokenCookie && tokenRef.value !== tokenCookie) {
    tokenRef.value = tokenCookie
  }
  return tokenCookie
}

const setTokenCookie = (token: string): void => {
  jsCookies.set('token', token)
}

const removeTokenCookie = (): void => {
  jsCookies.remove('token', { path: '/', domain: import.meta.env.NX_DOMAIN })
  jsCookies.remove('token', { path: '/' })
  tokenRef.value = ''
}

const clearAllCookies = (): void => {
  removeTokenCookie()
}

export const useCookieManager = () => {
  if (tokenRef.value !== getTokenCookie()) tokenRef.value = getTokenCookie()

  return {
    getTokenCookie,
    setTokenCookie,
    removeTokenCookie,
    doesCookieExist,
    clearAllCookies,
    tokenRef
  }
}
