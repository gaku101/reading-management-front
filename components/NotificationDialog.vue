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
          sm:my-8 sm:align-middle sm:max-w-xs sm:w-full sm:py-8
        "
      >
        <div class>
          <div class="text-center">
            <h3
              class="text-2xl leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              <slot name="title" />
            </h3>
          </div>
        </div>
        <div class="text-center text-lg mt-4">
          <slot name="body" />
        </div>
        <div class="text-center mt-5">
          <button
            type="button"
            class="
              justify-center
              rounded-md
              border border-transparent
              shadow-sm
              px-5
              py-1
              bg-blue-500
              text-base
              font-medium
              text-white
              hover:bg-blue-600
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-red-500
            "
            @click="okAction"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'NotificationDialog',
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
    okAction: {
      type: Function as PropType<() => any>,
      default: () => {},
    },
  },
  setup() {
    return {}
  },
})
</script>
