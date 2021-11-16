declare interface UserState {
  id: number
  username: string
  password: string
  profile: string
  image: string
}

declare interface EntryState {
  id: number
  amount: number
}

declare interface Post {
  id: number
  author: string
  authorImage: string
  title: string
  created_at: any
  category: {
    id: number
    name: string
  }
  book_author: string
  book_image: string
  book_page: number
  book_page_read: number
  favorites: number
  commentsNum: number
}
declare interface Category {
  id: number
  name: string
}
