<template>
  <div class="grid grid-cols-12 h-screen">
    <div class="col-start-2 col-span-10">
      <div class="flex place-items-center">
        <div class="text-2xl">Posts</div>
        <svg
          v-if="!isOpenedEditor"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 ml-3 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="openEditor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <PostEditor
        :is-opened.sync="isOpenedEditor"
        :is-created.sync="isCreatedPost"
        :cancel-action="closeEditor"
      />
      <PostCards :is-created.sync="isCreatedPost" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Index',
  setup(_) {
    const isOpenedEditor = ref(false)
    const openEditor = () => {
      isOpenedEditor.value = true
    }
    const closeEditor = () => {
      isOpenedEditor.value = false
    }
    const isCreatedPost = ref(false)
    return {
      openEditor,
      isOpenedEditor,
      closeEditor,
      isCreatedPost,
    }
  },
})
</script>
