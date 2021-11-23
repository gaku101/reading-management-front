<template>
  <div class="font-sans antialiased" id="app">
    <nav class="flex items-center justify-between flex-wrap bg-teal p-6">
      <div
        class="flex items-center flex-shrink-0 text-white bg-red-500 px-4 mr-6"
      >
        <span class="font-semibold text-xl tracking-tight"
          ><NuxtLink to="/" id="menu-item-0">Reading Management</NuxtLink></span
        >
      </div>
      <div class="block sm:hidden">
        <button
          @click="toggle"
          class="
            flex
            items-center
            px-3
            py-2
            border
            rounded
            text-teal-lighter
            border-teal-light
          "
        >
          <svg
            v-if="!open"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div
        :class="open ? 'block' : 'hidden'"
        class="w-full flex-grow sm:flex sm:items-center sm:w-auto"
      >
        <div class="text-sm sm:flex-grow">
          <NuxtLink
            class="
              block
              mt-4
              sm:inline-block sm:mt-0
              text-teal-lighter
              hover:opacity-50
              mr-4
            "
            to="/posts"
            id="menu-item-0"
            >My Posts</NuxtLink
          >
          <NuxtLink
            class="
              block
              mt-4
              sm:inline-block sm:mt-0
              text-teal-lighter
              hover:opacity-50
              mr-4
            "
            to="/favorites"
            id="menu-item-0"
            >Favorites</NuxtLink
          >
          <NuxtLink
            class="
              block
              mt-4
              sm:inline-block sm:mt-0
              text-teal-lighter
              hover:opacity-50
              mr-4
            "
            to="/following"
            id="menu-item-0"
            >Following</NuxtLink
          >
        </div>
        <div class="sm:flex place-items-center mt-4 sm:mt-0">
          <div v-if="open" class="text-sm">
            <NuxtLink
              to="/account"
              class="
                block
                mt-4
                sm:inline-block sm:mt-0
                text-teal-lighter
                hover:opacity-50
                mr-4
              "
              id="menu-item-0"
              >Account</NuxtLink
            >
            <NuxtLink
              to="/sign-in"
              class="
                block
                mt-4
                sm:inline-block sm:mt-0
                text-teal-lighter
                hover:opacity-50
                mr-4
              "
              id="menu-item-3"
            >
              Sign out
            </NuxtLink>
          </div>
          <SearchBox
            v-model="keyword"
            :search="search"
            placeholder="search"
            class="mt-4 sm:mt-0"
          />
          <div v-if="username" :class="open ? 'hidden' : ''" class="relative">
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
      keyword.value = ''
    }
    const open = ref(false)
    const toggle = () => {
      open.value = !open.value
    }
    return {
      username,
      dropDown,
      user,
      keyword,
      search,
      open,
      toggle,
    }
  },
})
</script>
