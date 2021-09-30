<template>
  <div>
    <Post />
    <Comments />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { list } from 'postcss'

export default defineComponent({
  name: 'PostId',
  setup() {},
})
</script>
