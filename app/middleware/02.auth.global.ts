export default defineNuxtRouteMiddleware(async(to) => {
  const session = useUserSession()

  if (to.path.startsWith(`/auth/log-in`) || to.path.startsWith(`/auth/sign-up`)) {
    // We fetch the session to ensure we have the most current state
    await session.fetch()
    if (session.loggedIn.value) {
      // If they're logged in, redirect them to the home page.
      return navigateTo(`/`)
    }
  }

  if (!to.path.startsWith(`/internal`)) {
    return
  }

  if (!session.loggedIn.value) {
    await session.fetch()
    if (!session.loggedIn.value) {
      return navigateTo(`/auth/log-in`)
    }
  }
  const user = session.user
})
