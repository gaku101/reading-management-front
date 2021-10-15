<template>
  <div class="grid grid-cols-12">
    <div v-if="post" class="col-start-2 col-span-10 mt-8">
      <div class="grid grid-cols-12 flex">
        <div class="col-span-2">
          <img :src="post.bookImage" alt="postImage" class="w-full" />
        </div>
        <div class="col-span-10 pt-4 pl-6">
          <div class="font-bold text-3xl text-gray-800">
            {{ post.title }}
          </div>
          <div class="text-2xl text-red-400 mt-2">
            {{ post.bookAuthor }}
          </div>
        </div>
      </div>
      <div v-if="!isEditing" class="flex place-content-evenly mt-8">
        <div class="text-gray-500">
          User:&nbsp;
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
      </div>
      <CategorySelect
        v-else
        class="mt-4 flex justify-end"
        v-model="selectedCategory"
      />
      <!-- <hr class="mt-2" /> -->
    </div>

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

