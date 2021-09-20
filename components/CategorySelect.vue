<template>
  <div class="selectbox">
    <select
      name="category"
      class="bgGray p-1 border-b border-gray-400"
      @change="updateValue"
    >
      <option :value="0" style="display: none">Select category...</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
        :selected="selected(category.id)"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'CategorySelect',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props, { root, emit }) {
    const categories = ref()
    const listCategories = async () => {
      const { data } = await root.$axios.get(`/api/category`)
      categories.value = data
    }
    listCategories()
    console.log('categoryselect', props.value)
    const updateValue = (e: any) => {
      console.log('updateValue', e.target.value)
      emit('input', parseInt(e.target.value))
    }
    onMounted(() => {
      emit('input', props.value)
    })
    const selected = (id: number) => {
      if (props.value === id) {
        return true
      } else {
        false
      }
    }
    return {
      categories,
      updateValue,
      selected
    }
  },
})
</script>