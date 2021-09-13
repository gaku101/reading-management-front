<template>
  <nav class="flex items-center justify-between mt-4">
    <div
      class="flex items-center flex-shrink-0 text-white bg-red-500 px-4 mr-6"
    >
      <span class="font-semibold text-xl tracking-tight"
        ><NuxtLink to="/" id="menu-item-0">My Portfolio</NuxtLink></span
      >
    </div>
    <div class="w-full block flex-grow flex items-center w-auto">
      <div class="text-sm flex-grow">
        <a class="inline-block hover:text-white mr-4"> Posts </a>
        <a href="#responsive-header" class="inline-block hover:text-white mr-4">
          Account
        </a>
        <a class="inline-block hover:text-white"> Favorites </a>
      </div>
      <div>
        <div v-if="username" class="relative">
          <img
            class="inline object-cover w-10 h-10 mr-2 rounded-full"
            src="~assets/profile.jpg"
            alt="Profile image"
            @click="dropDown = !dropDown"
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
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'Header',
  setup(_, { root }) {
    const username = computed(() => root.$store.getters['user/username'])
    const dropDown = ref(false)
    watch(
      () => root.$route,
      () => {
        dropDown.value = false
      }
    )
    return {
      username,
      dropDown,
    }
  },
})
</script>