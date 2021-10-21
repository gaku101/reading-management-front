declare interface UserState {
  id: number
  username: string
  password: string
  profile: string
  image: string
}

declare interface Post {
  id: number
  author: string
  title: string
  created_at: any
  category: {
    id: number
    name: string
  }
  bookAuthor: string
  bookImage: string
  bookPage: number
  bookPageRead: number
}
