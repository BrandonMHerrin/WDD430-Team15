'use client'
import React, { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    setLoading(false)

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Something went wrong")
      return
    }

    // Registro exitoso, redirige al login
    router.push("/pages/login")
  }

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "10px 20px" }} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </main>
  )
}
