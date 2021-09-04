<template>
  <div class="my-10">
    <div class="max-w-xs container mx-auto text-center text-3xl">Login</div>
    <div class="max-w-xs container mx-auto">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
            id="username"
            type="text"
            placeholder="Username"
            v-model="userInfo.username"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="
              shadow
              appearance-none
              border
              rounded
              w-full
              py-2
              px-3
              text-gray-700
              mb-3
              leading-tight
              focus:outline-none
              focus:shadow-outline
            "
            id="password"
            type="password"
            placeholder="*****"
            v-model="userInfo.password"
          />
        </div>
        <div>
          <button
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              rounded
              focus:outline-none
              focus:shadow-outline
            "
            type="button"
            @click="signIn"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

interface UserInfo {
  username: string
  password: string
}

export default defineComponent({
  name: 'SignIn',
  setup(_, { root }) {
    const userInfo: UserInfo = reactive({
      username: '',
      password: '',
    })
    /** サインイン */
    const signIn = async () => {
      console.log('userInfo', userInfo.username, userInfo.password)
      const { data } = await root.$axios.post('/api/users/login', {
        username: userInfo.username,
        password: userInfo.password,
      })
      console.log('res', data)
      if (data.access_token) {
        localStorage.setItem('token', data.access_token)
        root.$router.push('/')
      }
    }
    return {
      userInfo,
      signIn,
    }
  },
})
</script>
