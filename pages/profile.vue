<template>
  <div class="max-w-md container mx-auto mt-20 h-screen">
    <div class="grid grid-cols-3 place-items-center">
      <div
        class="col-span-3 relative pb-3"
        @mouseover="() => (isShowedEditAvatar = true)"
        @mouseleave="() => (isShowedEditAvatar = false)"
      >
        <ProfileImage :url="user.image" class="w-24 h-24" />
        <transition>
          <label
            for="file"
            v-if="isShowedEditAvatar"
            class="
              absolute
              bottom-0
              -right-5
              bg-gray
              px-2
              rounded-xl
              border-2
              flex
              place-items-center
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
            <div>Edit</div>
            <input
              type="file"
              name="fileinput"
              id="file"
              class="hidden"
              @change="editAvatar"
            />
          </label>
        </transition>
      </div>
      <div v-if="username" class="col-span-3 mt-3 text-2xl">
        {{ username }}
      </div>
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
      <div class="col-span-3 mt-6 text-md text-blue-400">
        Newbie&nbsp;&nbsp;|&nbsp;&nbsp;{{ user.points }} points
      </div>
      <button
        class="
          col-span-3
          bg-transparent
          text-red-400 text-xs
          font-semibold
          py-1
          px-4
          rounded-lg
          mt-3
          flex
          place-items-center
          hover:opacity-70
        "
        @click="isOpenedConfirm = true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline-block h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Delete your account</span>
      </button>
    </div>
    <ProfileEditor
      :is-opened="isOpenedEditProfile"
      :cancel-action="() => (isOpenedEditProfile = false)"
      :user="user"
    />
    <ConfirmDialog
      :is-opened="isOpenedConfirm"
      :cancel-action="() => (isOpenedConfirm = false)"
      :ok-action="deleteUser"
      >Are you sure you want to delete your account?</ConfirmDialog
    >
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import ProfileImage from '~/components/ProfileImage.vue'

export default defineComponent({
  components: { ProfileImage },
  name: 'Profile',
  setup() {
    const { store, $axios } = useContext()
    const router = useRouter()
    const user = computed(() => store.getters['user/user'])
    const username = computed(() => store.getters['user/username'])

    const isOpenedEditProfile = ref(false)

    const isShowedEditAvatar = ref(false)
    const uploadfile = ref('')
    const editAvatar = async (e: any) => {
      console.log('editAvatar')
      const files = e.target.files || e.dataTransfer.files
      // ファイルが選択されたら変数に入れる
      uploadfile.value = files[0]
      console.log('changeFile', uploadfile.value)

      // パラメータ生成
      const params = new FormData()
      // FormDataにアップロードするファイルを設定
      params.append('file', uploadfile.value)
      console.log('params', params)
      // API実行
      try {
        const { data } = await $axios.post(
          `/api/images/${user.value.username}`,
          params,
          {
            headers: {
              // multipartで送信
              'content-type': 'multipart/form-data',
            },
          }
        )
        console.log('regist', data)
        location.reload()
      } catch (e) {
        console.error(e)
      }
    }
    const isOpenedConfirm = ref(false)
    const deleteUser = async () => {
      try {
        await $axios.delete(`/api/users/${user.value.username}`)
        router.push({
          path: '/sign-up',
        })
      } catch (e) {
        console.error(e)
      }
    }
    return {
      user,
      username,
      isOpenedEditProfile,
      isShowedEditAvatar,
      editAvatar,
      isOpenedConfirm,
      deleteUser,
    }
  },
})
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>