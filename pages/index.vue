<template>
  <div class="mt-20">
    <div class="text-2xl">Index</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Index',
  setup(_, { root }) {
    const username = computed(() => root.$store.getters['user/username'])
    const dropDown = ref(false)
    return {
      username,
      dropDown,
    }
  },
})
</script>
<style scoped>
</style>