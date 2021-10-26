<template>
  <div class="grid grid-cols-12">
    <div class="col-start-2 col-span-10 mt-8">
      <div class="text-xl text-center py-2">Comments</div>
      <hr />
      <template v-if="comments">
        <div v-for="comment in comments" :key="comment.id">
          <div class="flex mt-2 place-items-center justify-between">
            <div class="flex place-items-center">
              <ProfileImage :url="comment.authorImage" class="w-10 h-10" />
              <div class="text-lg ml-2">
                {{ comment.author }}
              </div>
            </div>
            <svg
              v-if="user.username === comment.author"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 ml-4 text-gray-500 hover:opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              @click="openConfirm(comment.id)"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
          <div class="my-1 p-2 new-line" v-text="comment.body">
            {{ comment.body }}
          </div>
          <div class="ml-auto text-right">
            {{ $dayjs(comment.created_at).format('YYYY/MM/DD HH:mm') }}
          </div>
          <hr />
        </div>
      </template>
      <template v-if="!isPostAuthor">
        <ProfileImage :url="user.image" class="w-10 h-10 mt-2" />
        <textarea
          rows="5"
          class="block w-full mt-2 px-1 bg-gray"
          placeholder="Comment here..."
          v-model="comment"
        ></textarea>
        <hr class="mt-2" />
        <button
          type="button"
          class="
            block
            rounded-md
            border border-transparent
            shadow-sm
            px-4
            py-2
            bg-blue-500
            font-medium
            text-white
            hover:bg-blue-600
            focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-red-500
            sm:w-auto
            sm:text-sm
            ml-auto
            mt-2
          "
          @click="createComment"
        >
          Send
        </button>
      </template>
      <ConfirmDialog
        :is-opened="isOpenedConfirm"
        :cancel-action="closeConfirm"
        :ok-action="deleteComment"
        >Are you sure you want to delete this comment?</ConfirmDialog
      >
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'


export default defineComponent({
  name: 'Comments',
  setup() {
    const { store, params, $axios } = useContext()
    const user = computed(() => store.getters['user/user'])
    const comment = ref('')
    const postId = parseInt(params.value.postId)
    const pageId = 1
    const pageSize = 30
    const comments = ref()
    const listComments = async () => {
      try {
        const { data } = await $axios.get(
          `/api/comments/${postId}?page_id=${pageId}&page_size=${pageSize}`
        )
        console.log('listComments', data)
        comments.value = data
      } catch (e) {
        console.error(e)
      }
    }
    listComments()
    const createComment = async () => {
      try {
        const { data } = await $axios.post('/api/comments', {
          postId,
          body: comment.value,
        })
        console.log('createComment', data)
        comment.value = ''
        listComments()
      } catch (e) {
        console.error(e)
      }
    }
    const isPostAuthor = ref(false)
    const getPost = async () => {
      const { data } = await $axios.get(`/api/posts/${postId}`)
      console.log('getPost', data)
      isPostAuthor.value = user.value.username === data.author
      console.log('isPostAuthor', isPostAuthor.value)
    }
    getPost()
    const selectedComment = ref(0)
    const isOpenedConfirm = ref(false)
    const openConfirm = (commentId: number) => {
      isOpenedConfirm.value = true
      selectedComment.value = commentId
    }
    const deleteComment = async () => {
      try {
        const data = await $axios.delete(
          `/api/comments/${selectedComment.value}`
        )
        console.log('deletePost', data)
        selectedComment.value = 0
        listComments()
        isOpenedConfirm.value = false
      } catch (e) {
        console.error(e)
      }
    }
    const closeConfirm = () => {
      isOpenedConfirm.value = false
      selectedComment.value = 0
    }
    return {
      user,
      comment,
      comments,
      createComment,
      isPostAuthor,
      isOpenedConfirm,
      openConfirm,
      deleteComment,
      closeConfirm,
    }
  },
})
</script>
