import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma-client";
import { verifyPassword } from "@/lib/password-utility";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/newuser",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const user = await prisma.user.findUnique({
            where: { email: String(credentials.email) },
            select: {
              id: true,
              email: true,
              password: true,
              firstName: true,
              lastName: true,
            },
          });

          if (!user) {
            return null;
          }

          const isValid = await verifyPassword(
            String(credentials.password),
            user.password
          );

          if (!isValid) {
            return null;
          }

          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
          });

          return {
            id: user.id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          };
        } catch (error) {
          console.error(`Auth error: ${error}`);
          return null;
        }
      },
    }),
  ],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
