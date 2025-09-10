export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/internal')) {
    return
  }

  const session = useUserSession()

  if (!session.loggedIn.value) {
    await session.fetch()
    if (!session.loggedIn.value)
    {
      return navigateTo('/auth/log-in')
    }
  }
  const user = session.user
})