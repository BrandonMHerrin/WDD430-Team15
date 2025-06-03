type User = {
  id: string
  name?: string
  email: string
  password: string
}

const users: User[] = []

export function addUser(user: User) {
  users.push(user)
}

export function findUserByEmail(email: string) {
  return users.find(u => u.email === email)
}

export default users
