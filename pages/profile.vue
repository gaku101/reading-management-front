<template>
  <div class="max-w-md container mx-auto mt-20">
    <div class="grid grid-cols-3 place-items-center">
      <img
        class="col-span-3 w-24 h-24 rounded-full"
        src="~assets/profile.jpg"
        alt="Profile image"
      />
      <div v-if="username" class="col-span-3 mt-6 text-2xl">{{ username }}</div>
      <div v-if="user" class="col-span-3 mt-3 text-md">{{ user.profile }}</div>
      <button
        class="
          col-span-3
          bg-transparent
          hover:bg-blue-400
          text-blue-400 text-xs
          font-semibold
          hover:text-white
          py-1
          px-4
          border border-blue-300
          hover:border-transparent
          rounded-lg
          mt-3
        "
        @click="isOpenedEditProfile = true"
      >
        Edit Profile
      </button>
      <div v-if="points" class="col-span-3 mt-6 text-md text-blue-400">
        Newbie&nbsp;&nbsp;|&nbsp;&nbsp;{{ points }} points
      </div>
    </div>
    <ProfileEditor
      :is-opened="isOpenedEditProfile"
      :cancel-action="() => (isOpenedEditProfile = false)"
      :user="user"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Profile',
  setup(_, { root }) {
    const user = computed(() => root.$store.getters['user/user'])
    const username = computed(() => root.$store.getters['user/username'])
    const points = ref(0)

    const isOpenedEditProfile = ref(false)
    const getAccount = async () => {
      const { data } = await root.$axios.get(`/api/accounts/${user.value.id}`)
      console.log('data', data)
      points.value = data.balance
    }
    getAccount()
    return {
      user,
      username,
      points,
      isOpenedEditProfile,
    }
  },
})
</script>