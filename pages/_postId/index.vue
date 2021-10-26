<template>
  <div class="h-screen">
    <Post @get-author="author = $event" />
    <Notes v-if="isLoginedUser" />
    <Comments />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostId',
  setup() {
    const { store } = useContext()
    const author = ref('')
    const user = computed(() => store.getters['user/user'])
    const isLoginedUser = computed(() => {
      console.debug('author', author.value)
      return user.value.username === author.value
    })
    return {
      author,
      isLoginedUser
    }
  },
})
</script>
