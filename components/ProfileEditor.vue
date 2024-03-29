<template>
  <div
    v-if="isOpened"
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-5
        "
      >
        <div class="">
          <div class="sm:flex sm:items-start">
            <div class="text-center sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Edit Profile
              </h3>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 mt-3"
            for="profile"
          >
            Profile
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
            id="profile"
            type="text"
            placeholder="Profile"
            v-model="userInfo.profile"
          />
        </div>
        <div class="py-3 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-transparent
              shadow-sm
              px-4
              py-2
              bg-blue-500
              text-base
              font-medium
              text-white
              hover:bg-blue-600
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-red-500
              sm:ml-3 sm:w-auto sm:text-sm
            "
            @click="updateUser"
          >
            Update
          </button>
          <button
            type="button"
            class="
              mt-3
              w-full
              inline-flex
              justify-center
              rounded-md
              border border-gray-300
              shadow-sm
              px-4
              py-2
              bg-white
              text-base
              font-medium
              text-gray-700
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-indigo-500
              sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
            "
            @click="cancelAction"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// eslint-disable-next-line
import {
  defineComponent,
  reactive,
  PropType,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProfileEditor',
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
    cancelAction: {
      type: Function as PropType<() => any>,
      default: () => {},
    },
    user: {
      type: Object as () => UserState,
      required: true,
    },
  },
  setup(props) {
    const { $axios } = useContext()
    const userInfo: UserState = reactive({
      id: 0,
      username: '',
      password: '',
      profile: '',
      image: '',
    })
    Object.assign(userInfo, props.user)
    const updateUser = async () => {
      console.debug('props.user', props.user)
      console.debug('userInfo', userInfo)
      try {
        const { data } = await $axios.put('/api/users', {
          id: props.user.id,
          username: props.user.username,
          profile: userInfo.profile,
        })
        console.debug('data', data)
        Object.assign(props.user, userInfo)
        props.cancelAction()
      } catch (e) {
        console.error(e)
      }
    }
    return {
      userInfo,
      updateUser,
    }
  },
})
</script>