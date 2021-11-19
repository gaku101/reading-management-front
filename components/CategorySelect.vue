<template>
  <div class="selectbox">
    <select
      name="category"
      class="bg-gray p-1 border-b border-gray-400"
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
import {
  defineComponent,
  onMounted,
  ref,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CategorySelect',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { $axios } = useContext()
    const categories = ref()
    const listCategories = async () => {
      const { data } = await $axios.get(`/api/category`)
      categories.value = data
    }
    listCategories()
    console.debug('categoryselect', props.value)
    const updateValue = (e: any) => {
      console.debug('updateValue', e.target.value)
      emit('input', parseInt(e.target.value))
    }
    onMounted(() => {
      emit('input', props.value)
    })
    const selected = (id: number) => {
      if (props.value === id) {
        return true
      } else {
        return false
      }
    }
    return {
      categories,
      updateValue,
      selected,
    }
  },
})
</script>