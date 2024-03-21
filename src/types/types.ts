export interface initialStateType {
    messages: MessageType[],
    isLoad: boolean,
    isError:boolean,
}

export interface MessageType {
  id: number
  content: string
  createdAt: string
  score: number
  user: User
  replies: Reply[]
}

export interface User {
  image: Image
  username: string
}

export interface Image {
  png: string
  webp: string
}

export interface Reply {
  id: number
  content: string
  createdAt: string
  score: number
  replyingTo: string
  user: User2
}

export interface User2 {
  image: Image2
  username: string
}

export interface Image2 {
  png: string
  webp: string
}
