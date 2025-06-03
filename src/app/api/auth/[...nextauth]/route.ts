import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { findUserByEmail } from "@/lib/users"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        if (!credentials) return null

        const user = findUserByEmail(credentials.email)
        if (user && user.password === credentials.password) {
          return { id: user.id, name: user.name || "", email: user.email }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/pages/login",
  },
})

export { handler as GET, handler as POST }
