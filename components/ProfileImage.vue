<template>
  <img
    class="inline rounded-full"
    :src="url"
    alt="profile image"
    @click="clickAction"
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
  },
  setup() {},
})
</script>
