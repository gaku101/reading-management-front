<template>
  <div class="grid grid-cols-12">
    <nav class="col-start-2 col-span-10 flex items-center justify-between py-4">
      <div
        class="flex items-center flex-shrink-0 text-white bg-red-500 px-4 mr-6"
      >
        <span class="font-semibold text-xl tracking-tight"
          ><NuxtLink to="/" id="menu-item-0">My Portfolio</NuxtLink></span
        >
      </div>
      <div class="w-full block flex-grow flex items-center w-auto">
        <div class="text-sm flex-grow">
          <NuxtLink
            class="inline-block hover:text-red-200 mr-4"
            to="/posts"
            id="menu-item-0"
            >Posts</NuxtLink
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
          <div class="relative mx-auto text-gray-600 mr-2">
            <input
              v-model="keyword"
              class="
                border-2 border-gray-300
                bg-white
                h-10
                px-5
                pr-16
                rounded-lg
                text-sm
                focus:outline-none
              "
              type="search"
              name="search"
              placeholder="Search"
              @keyup.enter="search"
            />
            <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
              <svg
                class="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style="enable-background: new 0 0 56.966 56.966"
                xml:space="preserve"
                width="512px"
                height="512px"
              >
                <path
                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                />
              </svg>
            </button>
          </div>
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
                  to="/profile"
                  class="text-gray-700 block px-4 py-2 text-sm"
                  id="menu-item-0"
                  >Profile</NuxtLink
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
              hover:border-transparent
              hover:text-teal-500
              hover:bg-white
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
import { defineComponent, computed, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'Header',
  setup(_, { root }) {
    const user = computed(() => root.$store.getters['user/user'])
    const username = computed(() => root.$store.getters['user/username'])
    const dropDown = ref(false)
    watch(
      () => root.$route,
      () => {
        dropDown.value = false
      }
    )
    const keyword = ref('')
    const search = () => {
      root.$router.push({
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
