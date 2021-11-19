<template>
  <div class="grid grid-cols-3 mt-8">
    <div class="col-span-3">
      <div class="text-center text-xl mb-8">Transfers</div>
      <div
        v-for="transfer in transfers"
        :key="transfer.id"
        class="grid grid-cols-3 items-center mb-2"
      >
        <div class="col-span-2">
          <NuxtLink
            :to="`/user/${transfer.username}`"
            class="font-bold text-xl text-gray-600 hover:opacity-50"
            >{{ transfer.username }}&nbsp;</NuxtLink
          >
          sent&nbsp; you&nbsp;
          <span class="font-bold text-blue-600"
            >{{ transfer.amount }}&nbsp;</span
          >
          point<span v-if="transfer.amount > 1">s</span>
        </div>
        <div class="col-span-1">
          {{ $dayjs(transfer.created_at).format('YYYY/MM/DD HH:mm') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  computed,
  defineComponent,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $axios, store } = useContext()
    const user = computed(() => store.getters['user/user'])
    const pageId = 1
    const pageSize = 30
    const transfers = ref()
    const getTransfers = async () => {
      try {
        const { data } = await $axios.get(
          `/api/transfers/${user.value.id}?page_id=${pageId}&page_size=${pageSize}`
        )
        console.debug('getTransfers', data)
        transfers.value = data
      } catch (e) {
        console.error(e)
      }
    }
    getTransfers()
    return {
      transfers,
    }
  },
})
</script>
