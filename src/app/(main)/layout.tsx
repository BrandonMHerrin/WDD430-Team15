import Navbar from "@/app/(main)/components/navbar";
import Toolbar from "@/app/(main)/components/toolbar";
import prisma from "@/lib/prisma-client";
import { Category } from "@/types/category";
import { Prisma } from "@prisma/client";
import { auth } from "auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from 'react';



const mockCategories = [
  { id: 1, name: 'Handmade Crafts', isActive: true },
  { id: 2, name: 'Jewelry', isActive: true },
  { id: 3, name: 'Home Decor', isActive: true },
  { id: 4, name: 'Clothing', isActive: true },
  { id: 5, name: 'Art', isActive: true },
];


export default async function MainLayout({
 children 
}: { 
  children: ReactNode 
}) {
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
