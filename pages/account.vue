<template>
  <div class="max-w-md container mx-auto h-screen">
    <div class="grid grid-cols-3">
      <div class="flex justify-around col-span-3 mt-4 text-gray-600">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          class="hover:opacity-50 hover:border-gray-500"
          :class="{ 'border-b border-black': isActive === tab.id }"
          @click="isActive = tab.id"
        >
          {{ tab.name }}
        </div>
      </div>
    </div>
    <Profile v-if="isActive === 0" />
    <Points v-if="isActive === 1" />
  </div>
</template>

<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isActive = ref(0)
    const tabs = ref([
      { id: 0, name: 'Profile' },
      { id: 1, name: 'Points' },
    ])
    return {
      isActive,
      tabs,
    }
  },
})
</script>
