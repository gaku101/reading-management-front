const excludedNames = ['sign-in']
const isExcludedName = (name: string) => {
  return excludedNames.includes(name)
}
export default async ({ $axios, store, route, redirect }: any) => {
  const currentRouteName = route.name as string
  if (isExcludedName(currentRouteName)) return
  let { username } = store.getters['user/username']
  console.log('middleware', username)
  if (!username) {
    username = localStorage.getItem('username')
  }
  try {
    const { data } = await $axios.get(`/api/users/${username}`)
    console.log('getUser', data)
    await store.dispatch('user/setUser', data.user)
  } catch (e) {
    console.error(e)
    redirect('/sign-in')
  }
}
