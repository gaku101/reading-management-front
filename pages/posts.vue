<template>
  <div class="grid grid-cols-12 h-screen">
    <div class="col-start-2 col-span-10">
      <div class="text-2xl">My Posts</div>
      <PostCards />
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Posts',
  setup() {},
})
</script>
