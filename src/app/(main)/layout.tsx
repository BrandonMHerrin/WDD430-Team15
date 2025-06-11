import { auth } from "auth"
import { SessionProvider } from "next-auth/react";

export default async function MainLayout({children}: Readonly<{children: React.ReactNode}>) {
  const session = await auth();
 
  return (
    <SessionProvider session={session} refetchInterval={0} refetchOnWindowFocus={false}>
      <main>
        {children}
      </main>
    </SessionProvider>
  )
}