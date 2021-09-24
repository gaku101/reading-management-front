<template>
  <div v-if="post" class="container mx-auto max-w-lg">
    <div class="text-6xl mt-8 text-center">
      <span v-if="!isEditing" class="border-b border-black">{{
        post.title
      }}</span>
      <input
        v-else
        class="bgGray"
        id="text3"
        type="text"
        placeholder="Write title here..."
        autofocus
        v-model="post.title"
      />
    </div>
    <div v-if="!isEditing" class="flex place-content-evenly mt-8">
      <div class="text-gray-500">
        Author:&nbsp;
        <NuxtLink to="" class="text-red-400">
          {{ post.author }}
        </NuxtLink>
      </div>
      <div class="text-gray-500">
        Category:&nbsp;
        <span
          v-if="post.category.id"
          class="
            mt-4
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
      </div>
    </div>
    <CategorySelect
      v-else
      class="mt-4 flex justify-end"
      v-model="selectedCategory"
    />
    <div
      v-if="!isEditing"
      class="post-body leading-9 mt-8 text-lg"
      v-text="post.body"
    />
    <textarea
      v-else
      rows="10"
      class="block w-full bgGray mt-8 leading-9 text-lg"
      placeholder="Write body here..."
      v-model="post.body"
    ></textarea>
    <div v-if="isEditing" class="my-6 sm:flex sm:flex-row-reverse">
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
        @click="updatePost"
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
        @click="cancelEditing"
      >
        Cancel
      </button>
    </div>
    <svg
      v-if="!isEditing && isLoginedUser"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 ml-auto mt-4 text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      @click="openEditor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
    </svg>
    <svg
      v-if="!isLoginedUser"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 ml-auto mt-4 text-red-600"
      :class="isFavorite ? 'fill-current' : ''"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      @click="addFavorite"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { categoryColor } from '@/utils/categoryColor'

export default defineComponent({
  name: 'Post',
  setup(_, { root }) {
    const username = computed(() => root.$store.getters['user/username'])
    const user = computed(() => root.$store.getters['user/user'])
    const selectedCategory = ref(0)
    const postId = parseInt(root.$route.params.postId)
    const post = ref<Post>()
    const getPost = async () => {
      const { data } = await root.$axios.get(`/api/posts/${postId}`)
      console.log('getPost', data)
      post.value = data
      selectedCategory.value = data.category.id
      console.log('selectedCategory', selectedCategory.value)
    }
    getPost()
    const isLoginedUser = computed(() => username.value === post.value!.author)
    const isEditing = ref(false)
    const openEditor = () => {
      isEditing.value = true
    }
    const updatePost = async () => {
      try {
        const { data } = await root.$axios.put('/api/posts', {
          id: postId,
          author: username.value,
          title: post.value!.title,
          body: post.value!.body,
          categoryId: selectedCategory.value,
        })
        console.log('data', data)
        isEditing.value = false
        getPost()
      } catch (e) {
        console.error(e)
      }
    }
    const cancelEditing = () => {
      isEditing.value = false
    }
    const isFavorite = ref(false)
    const getFavorite = async () => {
      try {
        const { data } = await root.$axios.get(`/api/post-favorite/${postId}`)
        console.log('getFavorite', data)
        if (!!data && data.user_id === user.value.id) isFavorite.value = true
      } catch (e) {
        console.error(e)
      }
    }
    getFavorite()
    const addFavorite = async () => {
      try {
        const { data } = await root.$axios.post('/api/post-favorite', {
          postId: postId,
          userId: user.value.id,
        })
        console.log('addFavorite', data)
        isFavorite.value = true
      } catch (e) {
        console.error(e)
      }
    }
    return {
      post,
      categoryColor,
      openEditor,
      isEditing,
      selectedCategory,
      updatePost,
      cancelEditing,
      isLoginedUser,
      addFavorite,
      isFavorite,
    }
  },
})
</script>

