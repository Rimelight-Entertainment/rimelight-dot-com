export default defineNuxtRouteMiddleware((to) => {
  const isUnlocked = useCookie<boolean>(`is-unlocked`)
  const intendedPath = useCookie(`intended-path`)

  // If trying to access the construction page directly, allow it
  if (to.path === `/construction`) {
    return
  }

  // If the cookie is true (converted to boolean)
  if (isUnlocked.value) {
    if (intendedPath.value) {
      const path = intendedPath.value
      intendedPath.value = null
      return navigateTo(path, { replace: true })
    }
    return
  }

  // Store the intended path if not trying to access root
  if (to.path !== `/`) {
    intendedPath.value = to.fullPath
  }

  // Redirect to construction page if not unlocked
  return navigateTo(`/construction`)
})
