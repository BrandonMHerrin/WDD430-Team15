'use client'

import { useSession, signOut } from "next-auth/react"
import styles from "../../page.module.css"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/pages/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <p>Loading...</p>
        </main>
      </div>
    )
  }

  if (!session) {
    return null // ya redirige arriba con useEffect
  }

  return (
    <div className={styles.page}>
      <main className={styles.main} style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
        <h1>Welcome, {session.user?.name}!</h1>
        <p>Email: {session.user?.email}</p>
        <button
          className={styles.button}
          onClick={() => signOut({ callbackUrl: "/pages/login" })}
        >
          Logout
        </button>
      </main>
    </div>
  )
}
