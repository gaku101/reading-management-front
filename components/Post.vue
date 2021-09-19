<template>
  <div v-if="post" class="container mx-auto max-w-lg">
    <div class="text-6xl mt-8 text-center">
      <span class="border-b border-black">{{ post.title }}</span>
    </div>
    <div class="flex place-content-evenly mt-8">
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
    <div class="post-body mt-8 text-lg" v-text="post.body" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { categoryColor } from '@/utils/categoryColor'

export default defineComponent({
  name: 'Post',
  setup(_, { root }) {
    const pageId = parseInt(root.$route.params.postId)
    const post = ref<Post>()
    const getPost = async () => {
      const { data } = await root.$axios.get(`/api/posts/${pageId}`)
      console.log('getPost', data)
      post.value = data
    }
    getPost()
    return {
      post,
      categoryColor,
    }
  },
})
</script>
<style scoped>
.post-body {
  white-space: pre-line;
  word-wrap: break-word;
  line-height: 2rem;
}
</style>
