<template>
  <div class="grid grid-cols-12 h-screen">
    <div class="col-start-2 col-span-10">
      <div class="flex place-items-center">
        <div class="text-2xl">My Posts</div>
        <svg
          v-if="!isOpenedSearch"
          xmlns="http://www.w3.org/2000/svg"
          class="ml-2 h-7 w-7 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="isOpenedSearch = true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div v-if="isOpenedSearch" class="flex place-items-center">
        <div>
          <SearchBox
            class="mt-4"
            v-model="keyword"
            :search="search"
            placeholder="Search book and add new post"
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mt-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="isOpenedSearch = false"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>

      <PostCards />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Posts',
  setup() {
    const router = useRouter()
    const isOpenedSearch = ref(false)
    const keyword = ref('')
    const search = () => {
      router.push({
        path: `/search/${keyword.value}`,
      })
    }
    return {
      isOpenedSearch,
      keyword,
      search,
    }
  },
})
</script>
