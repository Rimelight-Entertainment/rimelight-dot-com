declare module '#auth-utils' {

  type UserRole = `user` | `employee`

  interface User {
    id: number
    email: string
    username: string
    first_name?: string
    last_name?: string
    role: UserRole
  }
}

export {}
