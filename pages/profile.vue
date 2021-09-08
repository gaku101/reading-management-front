<template>
  <div class="max-w-md container mx-auto">
    <div class="grid grid-cols-3 place-items-center mt-10">
      <img
        class="col-span-3 w-24 h-24 rounded-full"
        src="~assets/profile.jpg"
        alt="Profile image"
      />
      <div v-if="username" class="col-span-3 mt-6 text-2xl">{{ username }}</div>
      <button
        class="
          col-span-3
          bg-transparent
          hover:bg-blue-400
          text-blue-400
          text-xs
          font-semibold
          hover:text-white
          py-1
          px-4
          border border-blue-300
          hover:border-transparent
          rounded-lg
          mt-3
        "
      >
        Edit Profile
      </button>
      <div v-if="points" class="col-span-3 mt-6 text-md text-blue-400">
        Newbie | {{ points }} points
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Index',
  setup(_, { root }) {
    const user = computed(() => root.$store.getters['user/user'])
    const username = computed(() => root.$store.getters['user/username'])
    const points = ref(0)
    const getAccount = async () => {
      const { data } = await root.$axios.get(`/api/accounts/${user.value.id}`)
      console.log('data', data)
      points.value = data.balance
    }
    getAccount()
    return {
      username,
      points,
    }
  },
})
</script>