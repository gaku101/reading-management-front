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
          sm:my-8 sm:align-middle sm:max-w-xs sm:w-full sm:p-4
        "
      >
        <div class="">
          <div class="sm:flex sm:items-start">
            <div class="text-center sm:text-left">
              <h3
                class="text-xl leading-6 font-medium text-gray-700"
                id="modal-title"
              >
                Send Points
              </h3>
            </div>
          </div>
        </div>
        <div class="mt-2">How many points do you send to this user?</div>
        <div class="text-center">
          <input
            v-model="points"
            class="
              mt-2
              border-2 border-gray-300
              bg-white
              h-10
              pr-2
              rounded-lg
              text-sm
              focus:outline-none
              text-right
            "
            size="5"
            name="points"
            type="text"
            inputmode="numeric"
          />
          <span>&nbsp;points</span>
          <span>&nbsp;/&nbsp;</span>
          <span class="text-gray-600">{{ user.points }}</span>
          <span>&nbsp;points</span>
        </div>
        <div class="mt-2 sm:flex sm:flex-row-reverse">
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
            @click="sendPoints"
          >
            Send
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
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
// eslint-disable-next-line
import { defineComponent, PropType, computed, ref } from '@vue/composition-api'

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
    toUserId: {
      type: Number,
      required: true,
    },
  },
  setup(props, { root, emit }) {
    const user = computed(() => root.$store.getters['user/user'])
    const points = ref(0)
    const sendPoints = async () => {
      if (typeof points.value === 'string') {
        points.value = parseInt(points.value)
      }
      try {
        const { data } = await root.$axios.post('/api/transfers', {
          fromUserId: user.value.id,
          toUserId: props.toUserId,
          amount: points.value,
        })
        console.log('sendPoints', data)
        emit('send-points', data.to_user.points)
        props.cancelAction()
      } catch (e) {
        console.error(e)
      }
    }
    return {
      sendPoints,
      user,
      points,
    }
  },
})
</script>