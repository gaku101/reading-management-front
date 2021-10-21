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
              focus:outline-none focus:shadow-outline
            "
            id="username"
            type="text"
            placeholder="Username"
            autocomplete="text"
            v-model="userInfo.username"
          />
          <span class="text-red-400 text-xs">{{ usernameValidation }}</span>
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
              leading-tight
              focus:outline-none focus:shadow-outline
            "
            id="password"
            type="password"
            placeholder="*****"
            autocomplete="password"
            v-model="userInfo.password"
            @keypress.enter="signIn"
          />
          <span class="text-red-400 text-xs">{{ passwordValidation }}</span>
        </div>
        <div class="text-blue-400 mb-4 text-xs">
          Please
          <NuxtLink
            to="/sign-up"
            class="underline font-bold hover:text-blue-300"
            >SignUp</NuxtLink
          >
          if you don't have an account
        </div>
        <div class="text-red-400 text-xs mb-2">{{ signInError }}</div>
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
              focus:outline-none focus:shadow-outline
            "
            type="button"
            :disabled="validate"
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
import {
  computed,
  defineComponent,
  reactive,
  ref,
  watch,
} from '@vue/composition-api'
import useValidationRules from '@/utils/useValidation'

interface UserInfo {
  username: string
  password: string
}

export default defineComponent({
  name: 'SignIn',
  layout: 'no-header',
  setup(_, { root }) {
    const { usernameRules, passwordRules } = useValidationRules()
    const userInfo: UserInfo = reactive({
      username: '',
      password: '',
    })
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    /** signIn */
    const signInError = ref('')
    const signIn = async () => {
      console.log('userInfo', userInfo.username, userInfo.password)
      try {
        const { data } = await root.$axios.post('/api/users/login', {
          username: userInfo.username,
          password: userInfo.password,
        })
        console.log('res', data)
        if (data.access_token) {
          await root.$store.dispatch('user/setUser', data.user)
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('username', data.user.username)
          root.$router.push('/')
        }
      } catch (e: any) {
        const { data } = e.response
        console.error(data)
        if (data) {
          signInError.value = 'エラーが発生しました'
        }
      }
    }
    const usernameValidation = ref('')
    const passwordValidation = ref('')
    const validation = ref(false)
    watch(
      () => userInfo.username,
      (v: string) => (validation.value = usernameRules(v, usernameValidation))
    )
    watch(
      () => userInfo.password,
      (v: string) => (validation.value = passwordRules(v, passwordValidation))
    )
    const validate = computed(() => {
      if (!userInfo.username || !userInfo.password) {
        console.log('some userInfo not set')
        return true
      } else if (
        !usernameValidation.value &&
        !passwordValidation.value &&
        validation.value
      ) {
        console.log('passed validation')
        return false
      } else {
        console.log('not passed validation', validation.value)
        return true
      }
    })
    return {
      userInfo,
      signIn,
      usernameValidation,
      passwordValidation,
      validate,
      signInError,
    }
  },
})
</script>
