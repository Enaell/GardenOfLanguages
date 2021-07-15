export interface UserInterface {
  id: number
  username: string
  password: string
  name: string
  email: string
  language: string
  targetLanguage: string
  levels: {language: string, level: number}[];
  userBoard: string
}