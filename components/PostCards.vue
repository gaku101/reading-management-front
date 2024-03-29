<template>
  <div class="flex flex-wrap mt-10">
    <div
      v-for="post in posts"
      :key="post.id"
      class="w-full mb-2 sm:w-1/2 md:w-1/3 xl:w-1/4 px-4"
    >
      <NuxtLink
        :to="`/${post.id}`"
        class="
          block
          bg-white
          shadow-md
          hover:shadow-xl
          rounded-lg
          overflow-hidden
          p-4
        "
      >
        <div class="flex place-content-between">
          <div>
            <span
              v-if="post.category.id"
              class="
                inline-block
                px-2
                py-1
                leading-none
                rounded-full
                font-semibold
                uppercase
                tracking-wide
                text-xs
              "
              :class="{
                'bg-yellow-200': post.category.id === 1,
                'text-yellow-800': post.category.id === 1,
                'bg-blue-200': post.category.id === 2,
                'text-blue-800': post.category.id === 2,
                'bg-red-200': post.category.id === 3,
                'text-red-800': post.category.id === 3,
                'bg-green-200': post.category.id === 4,
                'text-green-800': post.category.id === 4,
                'bg-indigo-200': post.category.id === 5,
                'text-indigo-800': post.category.id === 5,
                'bg-pink-200': post.category.id === 6,
                'text-pink-800': post.category.id === 6,
                'bg-gray-200': post.category.id === 7,
                'text-gray-800': post.category.id === 7
              }"
              >{{ post.category.name }}</span
            >
            <span v-else class="inline-block" />
          </div>
          <NuxtLink
            :to="`/user/${post.author}`"
            class="hover:opacity-50 flex place-items-center"
            v-if="!isPosts"
          >
            <span class="mr-2">{{ post.author }}</span>
            <ProfileImage class="w-7 h-7" :url="post.authorImage" />
          </NuxtLink>
        </div>
        <div class="flex grid grid-cols-12 mt-4">
          <img
            :src="post.book_image ? post.book_image : '../assets/no-image.png'"
            alt="postImage"
            class="col-span-3 h-24 md:h-16"
          />
          <div class="col-span-9 px-2">
            <div>
              {{ post.title }}
            </div>
            <div class="text-gray-500">
              {{ post.bookAuthor }}
            </div>
          </div>
        </div>
        <div class="flex place-items-center mt-4">
          <div class="flex items-center text-sm text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 fill-current text-yellow-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <span class="ml-2">{{ post.favorites }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span class="ml-2">{{ post.commentsNum }}</span>
          </div>
          <div class="text-sm text-gray-600 ml-auto">
            {{ $dayjs(post.created_at).format('YYYY/MM/DD') }}
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
      
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostCards',
  props: {
    isCreated: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root, emit }) {
    const { store, $axios } = useContext()
    const user = computed(() => store.getters['user/user'])
    const pageId = 1
    const pageSize = 30
    const posts = ref<Post[]>()
    const listMyPosts = async () => {
      const { data } = await $axios.get(
        `/api/posts?page_id=${pageId}&page_size=${pageSize}`
      )
      data.sort(
        (a: Post, b: Post) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      posts.value = data
      console.debug('posts', posts.value)
    }
    const listPosts = async () => {
      const { data } = await $axios.get(
        `/api/posts/list?page_id=${pageId}&page_size=${pageSize}`
      )
      posts.value = data
      console.debug('posts', posts.value)
    }
    const listFavorites = async () => {
      const { data } = await $axios.get(
        `/api/post-favorite/list/${user.value.id}?page_id=${pageId}&page_size=${pageSize}`
      )
      posts.value = data
      console.debug('listFavorites', posts.value)
    }
    const path = ref(root.$route.path)
    const isPosts = ref(path.value === '/posts')
    switch (path.value) {
      case '/':
        listPosts()
        break
      case '/posts':
        listMyPosts()
        break
      case '/favorites':
        listFavorites()
        break
    }

    watch(
      () => props.isCreated,
      (val) => {
        if (val) {
          listMyPosts()
          emit('update:isCreated', false)
        }
      }
    )
    return {
      posts,
      isPosts,
    }
  },
})
</script>