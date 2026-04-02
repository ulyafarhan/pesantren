interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export const useAuth = () => {
  const user = useState<AuthUser | null>('auth-user', () => null)
  const loading = useState('auth-loading', () => false)

  const fetchUser = async () => {
    try {
      const data = await $fetch<{ user: AuthUser }>('/api/auth/me')
      user.value = data.user
    } catch {
      user.value = null
    }
  }

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const data = await $fetch<{ user: AuthUser }>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })
      user.value = data.user
      return { success: true }
    } catch (err: any) {
      return { success: false, error: err?.data?.statusMessage || 'Login gagal.' }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    navigateTo('/admin/login')
  }

  return { user, loading, fetchUser, login, logout }
}
