<template>
  <div>Search {{ books }}</div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Search',
  setup(_, { root }) {
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
          console.log('books.value', books.value)

        })
    }
    search()
    return {
      books,
    }
  },
})
</script>
