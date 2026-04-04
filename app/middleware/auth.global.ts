export default defineNuxtRouteMiddleware((to, from) => {
  // 1. Kita hanya membatasi rute yang berada di dalam lingkup '/admin'
  if (to.path.startsWith('/admin')) {
    
    // 2. Cek apakah ada cookie 'token' di browser pengunjung
    const token = useCookie('token')

    // 3. Jika mencoba masuk ke admin tapi TIDAK ADA token, tendang ke halaman login
    if (!token.value && to.path !== '/admin/login') {
      return navigateTo('/admin/login')
    }

    // 4. Jika SUDAH login (ada token) tapi mencoba buka halaman login lagi, arahkan ke dashboard
    if (token.value && to.path === '/admin/login') {
      return navigateTo('/admin')
    }
  }
})