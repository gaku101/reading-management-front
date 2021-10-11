<template>
  <img
    class="rounded-full"
    :src="url"
    alt="profile image"
    @click="clickAction"
    @mouseover="mouseover"
    @mouseleave="mouseleave"
  />
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ProfileImage',
  props: {
    url: {
      type: String,
      requried: true,
    },
    clickAction: {
      type: Function,
      default: () => {},
    },
    mouseover: {
      type: Function,
      default: () => {},
    },
    mouseleave: {
      type: Function,
      default: () => {},
    },
  },
  setup() {},
})
</script>
