<template>
  <div class="pt-20">
    <div class="flex items-center">
      <div class="text-2xl">Posts</div>
      <svg
        v-if="!isOpenedEditor"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 ml-3 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="openEditor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div>
      <div class="group mt-4 bgGray w-4/12">
        <input
          class="bgGray"
          id="text3"
          type="text"
          placeholder="Write title here..."
          autofocus
          v-model="title"
        />
        <div class="text_underline"></div>
      </div>
      <textarea
        rows="10"
        class="block w-full mx-auto mt-8 bgGray"
        placeholder="Write body here..."
        v-model="body"
      ></textarea>
      <div class="selectbox">
        <select
          name="category"
          class="bgGray"
          v-model="selectedCategory"
        >
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
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
          @click="createPost"
        >
          Send
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
          @click="closeEditor"
        >
          Cancel
        </button>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="flex flex-wrap mx-4">
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
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'Index',
  setup(_, { root }) {
    const username = computed(() => root.$store.getters['user/username'])
    const pageId = 2
    const pageSize = 10
    const posts = ref<Post[]>()
    const listPosts = async () => {
      const { data } = await root.$axios.get(
        `/api/posts?page_id=${pageId}&page_size=${pageSize}`
      )
      posts.value = data
      console.log('posts', posts.value)
    }
    listPosts()
    const categories = ref()
    const selectedCategory = ref(1)
    const listCategories = async () => {
      const { data } = await root.$axios.get(`/api/category`)
      categories.value = data
    }
    listCategories()
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
    const isOpenedEditor = ref(false)
    const openEditor = () => {
      isOpenedEditor.value = true
    }
    const closeEditor = () => {
      isOpenedEditor.value = false
    }
    const title = ref('')
    const body = ref('')
    const createPost = async () => {
      try {
        console.log('username', username)
        const { data } = await root.$axios.post('/api/posts', {
          author: username.value,
          title: title.value,
          body: body.value,
          category: selectedCategory.value,
        })
        listPosts()
        isOpenedEditor.value = false
      } catch (e) {
        console.error(e)
      }
    }
    return {
      posts,
      categoryColor,
      openEditor,
      isOpenedEditor,
      closeEditor,
      createPost,
      title,
      body,
      categories,
      selectedCategory,
    }
  },
})
</script>
<style scoped>
input {
  outline: none;
}
textarea {
  outline: none;
}
.bgGray {
  background-color: #fafafa;
}

#text3 {
  font-size: 16px;
  width: 100%;
  border: none;
  outline: none;
  padding-bottom: 8px;
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
.text_underline {
  position: relative; /*.text_underline::beforeの親要素*/
  border-top: 1px solid #c2c2c2; /*text3の下線*/
}

/*共通のstyle*/
.text_underline::before,
.text_underline::after {
  position: absolute;
  bottom: 0px; /*中央配置*/
  width: 0px; /*アニメーションで0pxから50%に*/
  height: 1px; /*高さ*/
  content: '';
  background-color: #3be5ae; /*アニメーションの色*/
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

/*中央から右へのアニメーション*/
.text_underline::before {
  left: 50%; /*中央配置*/
}

/*中央から左へのアニメーション*/
.text_underline::after {
  right: 50%; /*中央配置*/
}

#text3:focus + .text_underline::before,
#text3:focus + .text_underline::after {
  width: 50%;
}
</style>