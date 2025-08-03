import { useCookie } from '#app'

export const useAuth = () => {
  const token = useCookie('auth_token')
  const isLoggedIn = computed(() => !!token.value)

  return { isLoggedIn }
}
