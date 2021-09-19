<template>
  <div v-if="isOpened">
    <div class="group mt-4 bgGray w-4/12">
      <input
        class="bgGray"
        id="text3"
        type="text"
        placeholder="Write title here..."
        autofocus
        v-model="title"
      />
      <div class="text_underline"></div>
    </div>
    <textarea
      rows="10"
      class="block w-full mx-auto mt-8 bgGray"
      placeholder="Write body here..."
      v-model="body"
    ></textarea>
    <div class="selectbox">
      <select
        name="category"
        class="bgGray p-1 border-b border-gray-400"
        :class="selectedCategory === 0 ? 'text-gray-400' : ''"
        v-model="selectedCategory"
      >
        <option :value="0" style="display: none">Select category...</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="my-6 sm:flex sm:flex-row-reverse">
      <button
        type="button"
        class="
          w-full
          inline-flex
          justify-center
          rounded-md
          border border-transparent
          shadow-sm
          px-4
          py-2
          bg-blue-500
          text-base
          font-medium
          text-white
          hover:bg-blue-600
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          sm:ml-3
          sm:w-auto
          sm:text-sm
        "
        @click="createPost"
      >
        Send
      </button>
      <button
        type="button"
        class="
          mt-3
          w-full
          inline-flex
          justify-center
          rounded-md
          border border-gray-300
          shadow-sm
          px-4
          py-2
          bg-white
          text-base
          font-medium
          text-gray-700
          hover:bg-gray-50
          focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          sm:mt-0
          sm:ml-3
          sm:w-auto
          sm:text-sm
        "
        @click="cancelAction"
      >
        Cancel
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'PostEditor',
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
    isCreated: {
      type: Boolean,
      required: true,
    },
    cancelAction: {
      type: Function,
      required: true,
    },
  },
  setup(_, { root, emit }) {
    const username = computed(() => root.$store.getters['user/username'])
    const categories = ref()
    const selectedCategory = ref(0)
    const listCategories = async () => {
      const { data } = await root.$axios.get(`/api/category`)
      categories.value = data
    }
    listCategories()
    const title = ref('')
    const body = ref('')
    const createPost = async () => {
      try {
        await root.$axios.post('/api/posts', {
          author: username.value,
          title: title.value,
          body: body.value,
          category: selectedCategory.value,
        })
        emit('update:isOpened', false)
        emit('update:isCreated', true)
        title.value = ''
        body.value = ''
        selectedCategory.value = 1
      } catch (e) {
        console.error(e)
      }
    }
    return {
      categories,
      selectedCategory,
      title,
      body,
      createPost,
    }
  },
})
</script>
<style scoped>
select {
  outline: none;
}
input {
  outline: none;
}
textarea {
  outline: none;
}
.bgGray {
  background-color: #fafafa;
}

#text3 {
  font-size: 16px;
  width: 100%;
  border: none;
  outline: none;
  padding-bottom: 8px;
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
.text_underline {
  position: relative; /*.text_underline::beforeの親要素*/
  border-top: 1px solid #c2c2c2; /*text3の下線*/
}

/*共通のstyle*/
.text_underline::before,
.text_underline::after {
  position: absolute;
  bottom: 0px; /*中央配置*/
  width: 0px; /*アニメーションで0pxから50%に*/
  height: 1px; /*高さ*/
  content: '';
  background-color: #60a5fa; /*アニメーションの色*/
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}

/*中央から右へのアニメーション*/
.text_underline::before {
  left: 50%; /*中央配置*/
}

/*中央から左へのアニメーション*/
.text_underline::after {
  right: 50%; /*中央配置*/
}

#text3:focus + .text_underline::before,
#text3:focus + .text_underline::after {
  width: 50%;
}
</style>