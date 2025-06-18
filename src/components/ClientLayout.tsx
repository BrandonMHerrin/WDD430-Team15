'use client';

import Navbar from "@/app/(main)/components/navbar";
import Toolbar from "@/app/(main)/components/toolbar";
import { Category } from "@/types/category";
import { ReactNode, useState, useEffect } from 'react';
import { SessionProvider } from "next-auth/react";

interface ClientLayoutProps {
  children: ReactNode;
  cartItemCount?: number;
  isLoggedIn?: boolean;
}

export default function ClientLayout({ 
  children, 
  cartItemCount = 0, 
  isLoggedIn = false 
}: ClientLayoutProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Failed to fetch categories');
          // Fallback to empty array
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);
  
  const handleCategorySelect = (categoryId: number) => {
    console.log("Selected category:", categoryId);
    // Add your category selection logic here
  };

  return (
    <SessionProvider>
      <div>
        <Navbar
          cartItemCount={cartItemCount}
          isLoggedIn={isLoggedIn}
          categories={categories}
        />
        <Toolbar 
          categories={categories} 
          onCategorySelect={handleCategorySelect}
          isMobile={false} 
        />
        <main>{children}</main>
      </div>
    </SessionProvider>
  );
}