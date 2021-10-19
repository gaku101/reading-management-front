<template>
  <div class="grid grid-cols-12 h-screen">
    <div class="col-start-2 col-span-10">
      <div class="flex place-items-center">
        <div class="text-2xl">Posts</div>
      </div>
      <PostCards />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Index',
  setup() {},
})
</script>
