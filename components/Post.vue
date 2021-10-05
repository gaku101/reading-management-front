<template>
  <div v-if="post" class="container mx-auto max-w-lg">
    <div class="text-6xl mt-8 text-center">
      <span v-if="!isEditing" class="border-b border-black">{{
        post.title
      }}</span>
      <input
        v-else
        class="bg-gray"
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
      class="new-line leading-9 mt-8 text-lg"
      v-text="post.body"
    />
    <textarea
      v-else
      rows="10"
      class="block w-full bg-gray mt-8 leading-9 text-lg"
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
    <div v-if="!isEditing && isLoginedUser" class="flex justify-end">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 inline-block mt-4 text-blue-600"
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
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 inline-block mt-4 ml-4 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        @click="openConfirm"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
    <svg
      v-if="!isLoginedUser"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 ml-auto mt-4 text-yellow-300"
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
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
    <ConfirmDialog
      :is-opened="isOpenedConfirm"
      :cancel-action="() => (isOpenedConfirm = false)"
      :ok-action="deletePost"
      >Are you sure you want to delete this post?</ConfirmDialog
    >
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
          postId,
          userId: user.value.id,
        })
        console.log('addFavorite', data)
        isFavorite.value = true
      } catch (e) {
        console.error(e)
      }
    }
    const isOpenedConfirm = ref(false)
    const openConfirm = () => {
      isOpenedConfirm.value = true
    }
    const deletePost = async () => {
      try {
        const { data } = await root.$axios.delete(`/api/posts/${postId}`)
        console.log('deletePost', data)
        root.$router.push('/')
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
      openConfirm,
      isOpenedConfirm,
      deletePost,
    }
  },
})
</script>

