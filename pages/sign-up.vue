<template>
  <div class="grid grid-cols-6">
    <div class="col-start-3 col-span-2 bg-white shadow-md rounded mt-20">
      <div class="text-3xl text-center">Sign Up</div>
      <form class="px-8 py-6">
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
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
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
            id="email"
            type="text"
            placeholder="Email"
            autocomplete="text"
            v-model="userInfo.email"
          />
          <span class="text-red-400 text-xs">{{ emailValidation }}</span>
        </div>
        <div class="mb-2">
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
          />
          <span class="text-red-400 text-xs">{{ passwordValidation }}</span>
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="confirmPassword"
          >
            Confirm Password
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
            id="confirmPassword"
            type="password"
            placeholder="*****"
            autocomplete="password"
            v-model="userInfo.passwordConfirm"
          />
          <span class="text-red-400 text-xs">{{
            passwordConfirmValidation
          }}</span>
        </div>
        <div class="text-blue-400 mb-4 text-xs">
          Please
          <NuxtLink
            to="/sign-in"
            class="underline font-bold hover:text-blue-300"
            >SignIn</NuxtLink
          >
          if you have an account
        </div>
        <span class="text-red-400 text-xs">{{ signUpError }}</span>
        <div>
          <button
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              mt-2
              rounded
              focus:outline-none focus:shadow-outline
            "
            type="button"
            :disabled="validate"
            @click="signUp"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  computed,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import useValidationRules from '@/utils/useValidation'
interface UserInfo {
  username: string
  email: string
  password: string
  passwordConfirm: string
}


export default defineComponent({
  name: 'SignUp',
  layout: 'no-header',
  setup() {
    const { store, $axios } = useContext()
    const router = useRouter()
    const { usernameRules, passwordRules, passwordConfirmRules, emailRules } =
      useValidationRules()
    const userInfo: UserInfo = reactive({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    })
    const usernameValidation = ref('')
    const emailValidation = ref('')
    const passwordValidation = ref('')
    const passwordConfirmValidation = ref('')
    const validation = ref(false)
    watch(
      () => userInfo.username,
      (v: string) => (validation.value = usernameRules(v, usernameValidation))
    )
    watch(
      () => userInfo.email,
      (v: string) => (validation.value = emailRules(v, emailValidation))
    )
    watch(
      () => userInfo.password,
      (v: string) => (validation.value = passwordRules(v, passwordValidation))
    )
    watch(
      () => userInfo.passwordConfirm,
      (v: string) =>
        (validation.value = passwordConfirmRules(
          v,
          userInfo.password,
          passwordConfirmValidation
        ))
    )
    const validate = computed(() => {
      if (
        !userInfo.username ||
        !userInfo.email ||
        !userInfo.password ||
        !userInfo.passwordConfirm
      ) {
        console.log('some userInfo not set')
        return true
      } else if (
        !usernameValidation.value &&
        !emailValidation.value &&
        !passwordValidation.value &&
        !passwordConfirmValidation.value &&
        validation.value
      ) {
        console.log('passed validation')
        return false
      } else {
        console.log('not passed validation', validation.value)
        return true
      }
    })
    const signIn = async () => {
      try {
        const { data } = await $axios.post('/api/users/login', {
          username: userInfo.username,
          password: userInfo.password,
        })
        if (data.access_token) {
          await store.dispatch('user/setUser', data.user)
          localStorage.setItem('token', data.access_token)
          localStorage.setItem('username', data.user.username)
          router.push('/')
        }
      } catch (e) {
        console.error(e)
      }
    }
    const signUpError = ref('')
    const signUp = async () => {
      validation.value = usernameRules(userInfo.username, usernameValidation)
      validation.value = emailRules(userInfo.email, emailValidation)
      validation.value = passwordRules(userInfo.password, passwordValidation)
      validation.value = passwordConfirmRules(
        userInfo.passwordConfirm,
        userInfo.password,
        passwordConfirmValidation
      )
      try {
        const { data } = await $axios.post('/api/users', {
          username: userInfo.username,
          email: userInfo.email,
          password: userInfo.password,
          profile: '',
          image:
            'https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png',
        })
        console.log('signUp', data)
        signIn()
      } catch (e: any) {
        const { data } = e.response
        console.error(data)
        if (
          data.error ===
          'pq: duplicate key value violates unique constraint "users_username_key"'
        ) {
          usernameValidation.value = 'このusernameは既に使用されています'
        } else if (
          data.error ===
          'pq: duplicate key value violates unique constraint "users_email_key"'
        ) {
          emailValidation.value = 'このemailは既に使用されています'
        } else if (data) {
          signUpError.value = 'エラーが発生しました'
        }
      }
    }
    return {
      userInfo,
      usernameValidation,
      emailValidation,
      passwordValidation,
      passwordConfirmValidation,
      validate,
      signUp,
      signUpError,
    }
  },
})
</script>

