<template>
  <div class="grid grid-cols-12 h-full">
    <div class="col-start-2 col-span-10 mt-20">
      <div class="text-3xl text-gray-600 mb-10">{{ keyword }}の検索結果</div>
      <div class="shadow-md rounded bg-white">
        <div
          v-for="book in books"
          :key="book.id"
          class="grid grid-cols-12 flex bg-white hover:opacity-80"
          @click="selectBook(book)"
        >
          <div class="col-span-1 p-1">
            <img
              :src="book.image ? book.image : '../../assets/no-image.png'"
              alt="bookImage"
              class="h-32 md:h-28"
            />
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
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import { omitString } from '~/utils/useString'

export default defineComponent({
  name: 'Search',
  setup() {
    const { store, params, $axios } = useContext()
    const router = useRouter()
    const user = computed(() => store.getters['user/user'])
    const books = ref()
    const keyword = params.value.keyword
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
          for (const b of data.items) {
            const authors = b.volumeInfo.authors
            const price = b.saleInfo.listPrice
            const img = b.volumeInfo.imageLinks
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
          console.debug('books', data)
          console.debug('books.value', books.value)
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
        const { data } = await $axios.post('/api/posts', {
          author: user.value.username,
          title: selectedBook.value.title,
          bookAuthor: selectedBook.value.author,
          bookImage: selectedBook.value.image,
          bookPage: selectedBook.value.totalPage || 0,
          categoryId: 0,
        })
        if (data.entry.amount) {
          await store.dispatch('entry/setEntry', data.entry)
        }
        console.debug('createPost', data)
        router.push({
          path: `/${data.post.id}`,
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
