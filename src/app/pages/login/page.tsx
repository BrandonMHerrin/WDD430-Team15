'use client'

import { signIn } from "next-auth/react"
import React, { useState } from "react"
import styles from "../../page.module.css"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError("Invalid email or password")
      const wantsSignup = window.confirm(
        "Invalid login. Would you like to create an account?"
      )
      if (wantsSignup) {
        router.push("/pages/signup")
      }
    } else {
      // Login exitoso, redirigir a profile
      router.push("/pages/profile")
    }
  }

  return (
    <div className={styles.page}>
      <main className={styles.main} style={{ maxWidth: 400, margin: "auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          {error && <p style={{ color: "var(--artisan-terracotta)" }}>{error}</p>}
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </main>
    </div>
  )
}
