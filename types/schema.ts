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
  body: string
  created_at: any
  category:{
    id :number
    name: string
  }
  bookPageRead: number
}
