'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  name: string
  email: string
}

interface Props {
  onLogin: (user: User) => void
}

export default function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulación de autenticación 
    const fakeUser: User = { name: 'John Doe', email }
    localStorage.setItem('user', JSON.stringify(fakeUser))
    onLogin(fakeUser)
    router.push('/profile')
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
    </form>
  )
}
