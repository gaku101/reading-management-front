<template>
  <div class="h-screen">
    <Post />
    <Notes />
    <Comments />
    <transition>
      <NotificationDialog
        :is-opened="isOpenedNotification"
        :ok-action="() => (isOpenedNotification = false)"
      >
        <template v-slot:title>New Post Bonus &#127881; </template>
        <template v-slot:body>
          You got
          <span class="text-red-500 font-semibold">{{ entry.amount }}</span>
          point<span v-if="entry.amount > 1">s</span>!
        </template>
      </NotificationDialog>
    </transition>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PostId',
  beforeRouteEnter(to, from, next) {
    console.log('to', to)
    console.log('from', from)

    next(async (vm) => {
      console.log('vm', vm)

      if (from.name !== 'search-keyword') {
        await vm.$store.dispatch('entry/setEntry', { id: 0, amount: 0 })
        const entry = vm.$store.getters['entry/entry']
        console.debug('=== from sign-in ===', entry)
      }
    })
  },
  setup() {
    const { store, $axios, params } = useContext()
    const user = computed(() => store.getters['user/user'])
    const isOpenedNotification = ref(false)
    const entry = computed(() => store.getters['entry/entry'])
    onMounted(() => {
      console.debug('entry', entry.value)
      if (entry.value.amount) {
        isOpenedNotification.value = true
      }
    })
    const postId = parseInt(params.value.postId)

    const getPost = async () => {
      try {
        const { data } = await $axios.get(`/api/posts/${postId}`)
        console.log('getPost', data)
      } catch (e) {
        console.error(e)
      }
    }
    getPost()
    return {
      isOpenedNotification,
      entry,
    }
  },
})
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
