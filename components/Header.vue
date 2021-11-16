<template>
  <div class="grid grid-cols-12">
    <nav class="col-start-2 col-span-10 flex items-center justify-between py-4">
      <div
        class="flex items-center flex-shrink-0 text-white bg-red-500 px-4 mr-6"
      >
        <span class="font-semibold text-xl tracking-tight"
          ><NuxtLink to="/" id="menu-item-0">Reading Management</NuxtLink></span
        >
      </div>
      <div class="w-full block flex-grow flex items-center w-auto">
        <div class="text-sm flex-grow">
          <NuxtLink
            class="inline-block hover:text-red-200 mr-4"
            to="/posts"
            id="menu-item-0"
            >My Posts</NuxtLink
          >
          <NuxtLink
            class="inline-block hover:text-red-200 mr-4"
            to="/favorites"
            id="menu-item-0"
            >Favorites</NuxtLink
          >
          <NuxtLink
            class="inline-block hover:text-red-200 mr-4"
            to="/following"
            id="menu-item-0"
            >Following</NuxtLink
          >
        </div>
        <div class="flex place-items-center">
          <SearchBox v-model="keyword" :search="search" placeholder="search" />
          <div v-if="username" class="relative">
            <ProfileImage
              class="w-10 h-10 mr-2"
              :url="user.image"
              :click-action="() => (dropDown = !dropDown)"
            />
            <div
              v-if="dropDown"
              class="
                origin-top-right
                absolute
                right-0
                mt-2
                w-56
                rounded-md
                shadow-lg
                bg-white
                ring-1 ring-black ring-opacity-5
                focus:outline-none
              "
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div class="py-1">
                <NuxtLink
                  to="/account"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  id="menu-item-0"
                  >Account</NuxtLink
                >
                <NuxtLink
                  to="/sign-in"
                  class="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                  id="menu-item-3"
                >
                  Sign out
                </NuxtLink>
              </div>
            </div>
          </div>
          <NuxtLink
            v-else
            to="/sign-in"
            class="
              inline-block
              text-sm
              px-4
              py-2
              leading-none
              border
              rounded
              border-black
              hover:border-transparent hover:text-teal-500 hover:bg-white
            "
          >
            SignIn
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  watch,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Header',
  setup() {
    const { store, route } = useContext()
    const router = useRouter()
    const user = computed(() => store.getters['user/user'])
    const username = computed(() => store.getters['user/username'])
    const dropDown = ref(false)
    watch(
      () => route.value,
      () => {
        console.debug('route', route.value)
        dropDown.value = false
      }
    )
    const keyword = ref('')
    const search = () => {
      router.push({
        path: `/search/${keyword.value}`,
      })
    }
    return {
      username,
      dropDown,
      user,
      keyword,
      search,
    }
  },
})
</script>
