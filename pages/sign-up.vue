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
              focus:outline-none
              focus:shadow-outline
            "
            id="username"
            type="text"
            placeholder="Username"
            autocomplete="text"
            v-model="userInfo.username"
          />
          <span class="text-red-400 text-xs">{{ usernameValidation }}</span>
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
              focus:outline-none
              focus:shadow-outline
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
              focus:outline-none
              focus:shadow-outline
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
              focus:outline-none
              focus:shadow-outline
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
} from '@vue/composition-api'
import useValidationRules from '@/utils/useValidation'
interface UserInfo {
  username: string
  password: string
  passwordConfirm: string
}

export default defineComponent({
  name: 'SignUp',
  layout: 'no-header',
  setup(_, { root }) {
    const { usernameRules, passwordRules, passwordConfirmRules } =
      useValidationRules()
    const userInfo: UserInfo = reactive({
      username: '',
      password: '',
      passwordConfirm: '',
    })
    const usernameValidation = ref('')
    const passwordValidation = ref('')
    const passwordConfirmValidation = ref('')
    const validation = ref(false)
    watch(
      () => userInfo.username,
      (v: string) => (validation.value = usernameRules(v, usernameValidation))
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
        !userInfo.password ||
        !userInfo.passwordConfirm
      ) {
        console.log('some userInfo not set')
        return true
      } else if (
        !usernameValidation.value &&
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
    const signUp = async () => {
      try {
        const { data } = await root.$axios.post('/api/users/login', {
          username: userInfo.username,
          email: 'umeda@testemail.com',
          password: userInfo.username,
          profile: 'test',
          image:''
        })
      } catch (e) {
        console.error(e)
      }
    }
    return {
      userInfo,
      usernameValidation,
      passwordValidation,
      passwordConfirmValidation,
      validate,
      signUp,
    }
  },
})
</script>
<style scoped>
button:disabled {
  background: #ccc;
}
</style>
