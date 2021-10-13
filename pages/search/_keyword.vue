<template>
  <div class="grid grid-cols-12">
    <div class="col-start-3 col-span-8 mt-20">
      <div class="text-3xl text-gray-600 mb-10">{{ keyword }}の検索結果</div>
      <div class="shadow-md rounded bg-white">
        <div
          v-for="book in books"
          :key="book.id"
          class="grid grid-cols-12 flex bg-white hover:opacity-80"
          @click="selectBook(book)"
        >
          <div class="col-span-1 p-1">
            <img :src="book.image" alt="bookImage" class="h-32" />
          </div>
          <div class="col-span-11 p-2 pl-4">
            <div class="text-lg text-red-400">{{ book.title }}</div>
            <div class="text-gray-500">{{ book.author }}</div>
            <div class="text-gray-400">
              {{ omitString(book.description, 100) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <ConfirmDialog
      :is-opened="isOpenedConfirm"
      :cancel-action="() => (isOpenedConfirm = false)"
      :ok-action="createPost"
    >
      『{{
        selectedBook ? selectedBook.title : ''
      }}』の読書記録を作成しますか？</ConfirmDialog
    >
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { omitString } from '@/utils/string'

export default defineComponent({
  name: 'Search',
  setup(_, { root }) {
    const user = computed(() => root.$store.getters['user/user'])
    const books = ref()
    const keyword = root.$route.params.keyword
    const search = async () => {
      await fetch(
        'https://www.googleapis.com/books/v1/volumes?q=' +
          keyword +
          '&maxResults=20'
      )
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          const res = []
          for (let b of data.items) {
            let authors = b.volumeInfo.authors
            let price = b.saleInfo.listPrice
            let img = b.volumeInfo.imageLinks
            res.push({
              id: b.id,
              title: b.volumeInfo.title,
              author: authors ? authors.join(',') : '',
              price: price ? price.amount : '-',
              publisher: b.volumeInfo.publisher,
              published: b.volumeInfo.publishedDate,
              image: img ? img.thumbnail : '',
              totalPage: b.volumeInfo.pageCount,
              description: b.volumeInfo.description,
            })
          }
          books.value = res
          console.log('books', data)
          console.log('books.value', books.value)
        })
    }
    search()
    const isOpenedConfirm = ref(false)
    const selectedBook = ref()
    const selectBook = (book: any) => {
      selectedBook.value = book
      isOpenedConfirm.value = true
    }
    const createPost = async () => {
      try {
        const { data } = await root.$axios.post('/api/posts', {
          author: user.value.username,
          title: selectedBook.value.title,
          body: "test",
          categoryId: 0,
        })
        console.debug('createPost', data)
        root.$router.push({
        path: `/${data.id}`,
      })
        isOpenedConfirm.value = false
      } catch (e) {
        console.error(e)
      }
    }
    return {
      keyword,
      books,
      omitString,
      isOpenedConfirm,
      createPost,
      selectedBook,
      selectBook,
    }
  },
})
</script>