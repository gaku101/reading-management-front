<template>
  <div class="max-w-md container mx-auto mt-20 h-screen">
    <div class="grid grid-cols-3 place-items-center">
      <ProfileImage :url="user.image" class="col-span-3 w-24 h-24" />
      <div v-if="user.username" class="col-span-3 mt-6 text-2xl">
        {{ user.username }}
      </div>
      <div v-if="user" class="col-span-3 mt-3 text-md">{{ user.profile }}</div>
      <button
        v-if="!isFollow"
        class="
          col-span-3
          bg-transparent
          hover:bg-blue-400
          text-blue-400
          font-bold
          hover:text-white
          py-1
          px-4
          border border-blue-400
          hover:border-transparent
          rounded-2xl
          mt-3
        "
        @click="followUser"
      >
        Follow
      </button>
      <button
        v-else
        class="
          col-span-3
          bg-blue-400
          font-bold
          text-white
          py-1
          px-4
          rounded-2xl
          mt-3
          hover:text-blue-400
          hover:bg-transparent
          border border-blue-400
        "
        @click="unfollowUser"
        @mouseover="btnText = 'unfollow'"
        @mouseleave="btnText = 'following'"
      >
        <span>{{ btnText }}</span>
      </button>
      <div class="col-span-3 mt-6 text-md text-blue-400">
        Newbie&nbsp;&nbsp;|&nbsp;&nbsp;{{ points }} points
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'

export default defineComponent({
  name: '',
  setup(_, { root }) {
    const user: UserState = reactive({
      id: 0,
      username: '',
      password: '',
      profile: '',
      image: '',
    })
    const username = root.$route.params.userName
    const points = ref(0)
    const getAccount = async () => {
      const { data } = await root.$axios.get(
        `/api/accounts/by/${user.username}`
      )
      points.value = data.balance
    }
    const getUser = async () => {
      try {
        const { data } = await root.$axios.get(`/api/users/${username}`)
        Object.assign(user, data)
        getAccount()
        getFollow()
      } catch (e) {
        console.error(e)
      }
    }
    getUser()
    const isFollow = ref(false)
    const followUser = async () => {
      try {
        const { data } = await root.$axios.post('/api/follow', {
          followingId: user.id,
        })
        console.log('followUser', data)
        isFollow.value = true
      } catch (e) {
        console.error(e)
      }
    }
    const getFollow = async () => {
      try {
        const { data } = await root.$axios.get(`/api/follow/${user.id}`)
        console.log('getFollow', data)
        if (data) isFollow.value = true
      } catch (e) {
        console.error(e)
      }
    }
    const unfollowUser = async () => {
      try {
        const data = await root.$axios.delete(`/api/follow/${user.id}`)
        console.log('unfollowUser', data)
        isFollow.value = false
      } catch (e) {
        console.error(e)
      }
    }
    const btnText = ref('following')
    return {
      user,
      points,
      followUser,
      isFollow,
      unfollowUser,
      btnText,
    }
  },
})
</script>
