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
          hover:text-blue-400 hover:bg-transparent
          border border-blue-400
        "
        @click="unfollowUser"
        @mouseover="btnText = 'unfollow'"
        @mouseleave="btnText = 'following'"
      >
        <span>{{ btnText }}</span>
      </button>
      <div class="col-span-3 mt-6 text-md text-blue-400">
        Newbie&nbsp;&nbsp;|&nbsp;&nbsp;{{ user.points }} points
      </div>
      <button
        class="flex col-span-3 text-blue-400 font-bold mt-4 hover:opacity-70"
        @click="isOpenedDialog = true"
      >
        <span>Send Points</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ml-1 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
          />
        </svg>
      </button>
    </div>
    <SendPointsDialog
      :is-opened="isOpenedDialog"
      :cancel-action="() => (isOpenedDialog = false)"
      :to-user-id="user.id"
      @send-points="user.points = $event"
    />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: '',
  setup() {
    const { params, $axios } = useContext()

    const user: UserState = reactive({
      id: 0,
      username: '',
      password: '',
      profile: '',
      image: '',
    })
    const username = params.value.userName

    const getUser = async () => {
      try {
        const { data } = await $axios.get(`/api/users/${username}`)
        Object.assign(user, data)
        getFollow()
      } catch (e) {
        console.error(e)
      }
    }
    getUser()
    const isFollow = ref(false)
    const followUser = async () => {
      try {
        const { data } = await $axios.post('/api/follow', {
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
        const { data } = await $axios.get(`/api/follow/${user.id}`)
        console.log('getFollow', data)
        if (data) isFollow.value = true
      } catch (e) {
        console.error(e)
      }
    }
    const unfollowUser = async () => {
      try {
        const data = await $axios.delete(`/api/follow/${user.id}`)
        console.log('unfollowUser', data)
        isFollow.value = false
      } catch (e) {
        console.error(e)
      }
    }
    const btnText = ref('following')
    const isOpenedDialog = ref(false)
    return {
      user,
      followUser,
      isFollow,
      unfollowUser,
      btnText,
      isOpenedDialog,
    }
  },
})
</script>
