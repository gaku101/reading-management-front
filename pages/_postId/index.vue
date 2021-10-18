<template>
  <div>
    <Post @get-author="author = $event" />
    <Notes v-if="isLoginedUser" />
    <Comments />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'PostId',
  setup(_, { root }) {
    const author = ref('')
    const user = computed(() => root.$store.getters['user/user'])
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
