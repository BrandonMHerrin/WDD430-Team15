import Navbar from "@/app/(main)/components/navbar";
import Toolbar from "@/app/(main)/components/toolbar";
import prisma from "@/lib/prisma-client";
import { Category } from "@/types/category";
import { Prisma } from "@prisma/client";
import { auth } from "auth";
import { SessionProvider } from "next-auth/react";

export default async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  const categories: Category[] = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      sortOrder: true,
      children: {
        select: {
          id: true,
          name: true,
          description: true,
          sortOrder: true,
        },
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
    where: { isActive: true, parentCategoryId: null },
    orderBy: { sortOrder: "asc" },
  });

  const handleCategorySelect = (categoryId: string) => {
    console.log("Selected category:", categoryId);
    // Still missing, add later on here: filtering logic
  };

  return (
    <SessionProvider
      session={session}
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      <main>
        <Navbar
          cartItemCount={3}
          isLoggedIn={!!session?.user}
          categories={categories}
        />
        <Toolbar categories={categories} isMobile={false} />
        {children}
      </main>
    </SessionProvider>
  );
}
