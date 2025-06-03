'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface User {
  name: string
  email: string
}

interface Props {
  user: User
}

export default function UserProfile({ user }: Props) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <div>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>Logout</button>
    </div>
  )
}
