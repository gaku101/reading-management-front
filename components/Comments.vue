<template>
  <div class="container mx-auto max-w-lg rounded-lg overflow-hidden p-2 mt-4">
    <div class="text-xl text-center py-2">Comments</div>
    <hr />
    <template v-if="comments">
      <div v-for="comment in comments" :key="comment.id">
        <div class="flex mt-2 place-items-center">
          <ProfileImage :url="comment.authorImage" class="w-10 h-10" />
          <div class="text-lg ml-2">
            {{ comment.author }}
          </div>
        </div>
        <div class="my-1">{{ comment.body }}</div>
        <div class="ml-auto text-right">
          {{ $dayjs(comment.created_at).format('YYYY/MM/DD HH:mm') }}
        </div>
        <hr />
      </div>
    </template>
    <template v-if="!isLoginedUser">
      <ProfileImage :url="user.image" class="w-10 h-10 mt-2" />
      <textarea
        rows="5"
        class="block w-full mt-2 px-1 bgGray"
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
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Comments',
  setup(_, { root }) {
    const user = computed(() => root.$store.getters['user/user'])
    const comment = ref('')
    const postId = parseInt(root.$route.params.postId)
    const pageId = 1
    const pageSize = 30
    const comments = ref()
    const listComments = async () => {
      try {
        const { data } = await root.$axios.get(
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
        const { data } = await root.$axios.post('/api/comments', {
          postId: postId,
          body: comment.value,
        })
        console.log('createComment', data)
        comment.value = ''
        listComments()
      } catch (e) {
        console.error(e)
      }
    }
    const isLoginedUser = ref(false)
    const getPost = async () => {
      const { data } = await root.$axios.get(`/api/posts/${postId}`)
      console.log('getPost', data)
      isLoginedUser.value = user.value.username === data.author
      console.log('isLoginedUser', isLoginedUser.value)
    }
    getPost()
    return {
      user,
      comment,
      comments,
      createComment,
      isLoginedUser
    }
  },
})
</script>
