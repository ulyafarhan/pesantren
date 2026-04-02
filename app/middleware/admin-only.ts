export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return

  if (to.path.startsWith('/admin')) {
    const { user, fetchUser } = useAuth()
    
    if (!user.value) {
      await fetchUser()
    }

    if (!user.value) {
      return navigateTo('/admin/login')
    }
  }
})