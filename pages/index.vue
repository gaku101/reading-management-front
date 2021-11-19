<template>
  <div class="grid grid-cols-12 h-screen">
    <div class="col-start-2 col-span-10">
      <div class="flex place-items-center">
        <div class="text-2xl">Posts</div>
      </div>
      <PostCards />
      <transition>
        <NotificationDialog
          :is-opened="isOpenedNotification"
          :ok-action="() => (isOpenedNotification = false)"
        >
          <template v-slot:title>Login Bonus &#127881; </template>
          <template v-slot:body>
            You got <span class="text-red-500 font-semibold">{{ entry.amount }}</span> point
            <span v-if="entry.amount > 1">s</span>!
          </template>
        </NotificationDialog>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Index',
  beforeRouteEnter(to, from, next) {
    console.debug('to', to)
    console.debug('from', from)

    next(async (vm) => {
      console.debug('vm', vm)

      if (from.name !== 'sign-in') {
        await vm.$store.dispatch('entry/setEntry', { id: 0, amount: 0 })
        const entry = vm.$store.getters['entry/entry']
        console.debug('=== from sign-in ===', entry)
      }
    })
  },
  setup() {
    const { store } = useContext()
    const entry = computed(() => store.getters['entry/entry'])
    const isOpenedNotification = ref(false)
    const openConfirm = () => {
      isOpenedNotification.value = true
    }
    onMounted(() => {
      if (entry.value.amount) {
        isOpenedNotification.value = true
      }
    })
    return {
      entry,
      isOpenedNotification,
      openConfirm,
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
