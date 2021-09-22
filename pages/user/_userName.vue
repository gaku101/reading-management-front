<template>
  <div class="max-w-md container mx-auto mt-20">
    <div class="grid grid-cols-3 place-items-center">
      <ProfileImage :url="user.image" class="col-span-3 w-24 h-24" />
      <div v-if="user.username" class="col-span-3 mt-6 text-2xl">
        {{ user.username }}
      </div>
      <div v-if="user" class="col-span-3 mt-3 text-md">{{ user.profile }}</div>
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
      const { data } = await root.$axios.get(`/api/accounts/by/${user.username}`)
      points.value = data.balance
    }
    const getUser = async () => {
      try {
        const { data } = await root.$axios.get(`/api/users/${username}`)
        Object.assign(user, data)
        getAccount()
      } catch (e) {
        console.error(e)
      }
    }
    getUser()

    return {
      user,
      points,
    }
  },
})
</script>
