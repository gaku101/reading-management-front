<template>
  <div class="grid grid-cols-12">
    <div v-if="post" class="col-start-2 col-span-10 mt-8">
      <div class="grid grid-cols-12 flex">
        <div class="col-span-2">
          <img
            :src="post.bookImage ? post.bookImage : '../assets/no-image.png'"
            alt="postImage"
            class="w-full"
          />
        </div>
        <div class="col-span-10 grid grid-rows-6 pl-6">
          <div class="flex place-items-center justify-between mb-2">
            <div v-if="!isEditing" class="text-gray-500">
              <span>Category:&nbsp;</span>
              <span
                v-if="category.id"
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
                :class="categoryColor(category.id)"
                >{{ category.name }}</span
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 ml-1 inline-block text-blue-600"
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
            </div>
            <div v-else class="flex place-items-center">
              <CategorySelect v-model="selectedCategory" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 pl-1 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="isEditing = false"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div class="flex place-items-center">
              <div class="text-gray-500 mr-4">
                User:&nbsp;
                <NuxtLink :to="`/user/${post.author}`" class="text-red-400">
                  {{ post.author }}
                </NuxtLink>
              </div>
              <svg
                v-if="isLoginedUser"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="isOpenedConfirm = true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-yellow-300"
                :class="isFavorite ? 'fill-current' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="toggleFavorite"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
            </div>
          </div>
          <div class="font-bold text-3xl text-gray-800">
            {{ post.title }}
          </div>
          <div class="text-2xl text-red-400 mt-2">
            {{ post.bookAuthor }}
          </div>
          <div class="row-start-5 flex place-items-center text-lg">
            <div
              v-if="!isEditingPage"
              class="hover:opacity-50"
              @click="updatePage"
            >
              <span class="text-gray-500">{{ post.bookPageRead }}</span>
              &nbsp;page
            </div>
            <input
              v-else
              v-model="post.bookPageRead"
              class="
                border-2 border-gray-300
                bg-white
                h-10
                pr-2
                rounded-lg
                text-sm
                focus:outline-none
                text-right
              "
              size="5"
              name="page"
              placeholder="page"
              type="text"
              inputmode="numeric"
              autofocus
              @blur="updatePageRead"
              @keyup.enter="updatePageRead"
              @click="removeZero"
            />
            <div>&nbsp;/&nbsp;</div>
            <div>
              <span class="text-blue-700">{{ post.bookPage }}</span>
              &nbsp;page
            </div>
          </div>
          <div class="row-start-6 place-items-start text-red-400 text-xs">
            {{ pageValidation }}
          </div>
        </div>
      </div>
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
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  ref,
  useContext,
  useRouter,
  watch,
} from '@nuxtjs/composition-api'
import { categoryColor } from '~/utils/useCategoryColor'
import { removeZero } from '~/utils/useNumber'
import useValidationRules from '@/utils/useValidation'

export default defineComponent({
  name: 'Post',
  props: {
    postProp: {
      type: Object as PropType<Post>,
      required: true,
    },
    categoryProp: {
      type: Object as PropType<Category>,
      required: true,
    },
  },
  setup(props) {
    const { store, $axios, params } = useContext()
    const router = useRouter()
    const username = computed(() => store.getters['user/username'])
    const user = computed(() => store.getters['user/user'])

    const postId = parseInt(params.value.postId)
    const post: Post = reactive(props.postProp)
    const category: Category = reactive(props.categoryProp)
    const selectedCategory = ref(category.id)
    watch(selectedCategory, () => {
      console.debug('selectedCategory', selectedCategory.value)
      updateCategory()
    })
    const isLoginedUser = computed(() => username.value === post!.author)
    const isEditing = ref(false)
    const openEditor = () => {
      isEditing.value = true
    }
    const updateCategory = async () => {
      try {
        const { data } = await $axios.put('/api/post-category', {
          postId,
          categoryId: selectedCategory.value,
        })
        console.log('updateCategory', data)
        isEditing.value = false
        Object.assign(category, data)
      } catch (e) {
        console.error(e)
      }
    }
    const updatePageRead = async () => {
      if (!validation.value) {
        post.bookPageRead = stashedPageRead.value
        pageValidation.value = ''
        return
      }
      try {
        if (typeof post?.bookPageRead === 'string') {
          post.bookPageRead = parseInt(post?.bookPageRead)
        }
        const { data } = await $axios.put('/api/posts', {
          id: postId,
          author: username.value,
          BookPageRead: post?.bookPageRead || 0,
        })
        console.log('data', data)
        isEditingPage.value = false
        Object.assign(post?.category, data.category)
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
        const { data } = await $axios.get(`/api/post-favorite/${postId}`)
        console.log('getFavorite', data)
        if (!!data && data.user_id === user.value.id) isFavorite.value = true
      } catch (e) {
        console.error(e)
      }
    }
    getFavorite()
    const toggleFavorite = () => {
      isFavorite.value ? deleteFavorite() : addFavorite()
    }
    const addFavorite = async () => {
      try {
        const { data } = await $axios.post('/api/post-favorite', {
          postId,
          userId: user.value.id,
        })
        console.log('addFavorite', data)
        isFavorite.value = true
      } catch (e) {
        console.error(e)
      }
    }
    const deleteFavorite = async () => {
      try {
        await $axios.delete(`/api/post-favorite/${postId}`)
        isFavorite.value = false
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
        const { data } = await $axios.delete(`/api/posts/${postId}`)
        console.log('deletePost', data)
        router.push('/')
      } catch (e) {
        console.error(e)
      }
    }
    const isEditingPage = ref(false)
    const { pageRules } = useValidationRules()
    const pageValidation = ref('')
    const validation = ref(false)
    watch(
      () => post.bookPageRead,
      (v: number) =>
        (validation.value = pageRules(String(v), post.bookPage, pageValidation))
    )
    const stashedPageRead = ref(0)
    const updatePage = () => {
      isEditingPage.value = true
      stashedPageRead.value = post.bookPageRead
    }
    return {
      post,
      category,
      categoryColor,
      openEditor,
      isEditing,
      selectedCategory,
      cancelEditing,
      isLoginedUser,
      addFavorite,
      isFavorite,
      openConfirm,
      isOpenedConfirm,
      deletePost,
      toggleFavorite,
      isEditingPage,
      removeZero,
      pageValidation,
      updatePage,
      updatePageRead,
    }
  },
})
</script>

