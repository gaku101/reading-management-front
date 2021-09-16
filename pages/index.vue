<template>
  <div class="pt-20">
    <div class="text-2xl">Posts</div>
    <div class="mx-2">
      <textarea
        name=""
        id=""
        rows="10"
        class="block w-full mx-auto mt-8 p-3 bgGray"
        placeholder="Write here..."
        autofocus
      ></textarea>
      <div class="my-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          class="
            w-full
            inline-flex
            justify-center
            rounded-md
            border border-transparent
            shadow-sm
            px-4
            py-2
            bg-blue-500
            text-base
            font-medium
            text-white
            hover:bg-blue-600
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-red-500
            sm:ml-3
            sm:w-auto
            sm:text-sm
          "
        >
          Update
        </button>
        <button
          type="button"
          class="
            mt-3
            w-full
            inline-flex
            justify-center
            rounded-md
            border border-gray-300
            shadow-sm
            px-4
            py-2
            bg-white
            text-base
            font-medium
            text-gray-700
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            sm:mt-0
            sm:ml-3
            sm:w-auto
            sm:text-sm
          "
        >
          Close
        </button>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="flex flex-wrap -mx-4">
        <div
          v-for="post in posts"
          :key="post.id"
          class="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4"
        >
          <a
            href=""
            class="
              c-card
              block
              bg-white
              shadow-md
              hover:shadow-xl
              rounded-lg
              overflow-hidden
            "
          >
            <div class="p-4">
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
                :class="categoryColor(post.category.id)"
                >{{ post.category.name }}</span
              >
              <h2 class="mt-2 mb-2 font-bold">
                {{ post.title }}
              </h2>
              <p class="text-sm">
                {{ post.body }}
              </p>
            </div>
            <div
              class="p-4 flex items-center text-sm text-gray-600 justify-end"
            >
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
              <span class="ml-2">7</span>
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
              <span class="ml-2">5</span>
            </div>
            <div
              class="p-4 flex items-center text-sm text-gray-600 justify-end"
            >
              {{ $dayjs(post.created_at).format('YYYY/MM/DD HH:mm') }}
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Index',
  setup(_, { root }) {
    const pageId = 1
    const pageSize = 10
    const posts = ref<Post[]>()
    const listPosts = async () => {
      const { data } = await root.$axios.get(
        `/api/posts?page_id=${pageId}&page_size=${pageSize}`
      )
      posts.value = data
      console.log('posts', posts.value)
    }
    const categoryColor = (id: number) => {
      switch (id) {
        case 1:
          return 'bg-yellow-200 text-yellow-800'
        case 2:
          return 'bg-blue-200 text-blue-800'
        default:
          return 'bg-red-200 text-red-800'
      }
    }
    listPosts()
    return {
      posts,
      categoryColor,
    }
  },
})
</script>
<style scoped>
textarea:valid {
  outline: none;
}
.bgGray {
  background-color: #fafafa;
}
</style>