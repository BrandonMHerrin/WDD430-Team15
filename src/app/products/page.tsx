'use client'
//import { Metadata } from 'next';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Navbar from "@/components/navbar";
import Toolbar from "@/components/toolbar";
import { categoriesData } from '@/data/categories';
import { mockUserLocalSto } from '@/lib/auth';
import { getCartItemCount } from "@/data/cartItems";


import  NewReview from '@/components/product/comment-form'
import { ProductCard } from '@/components/ui/ProductCards';

//import { useSearchParams } from 'next/navigation';
//import { fetchProductReviews } from '@/app/lib/actions';
 
// export const metadata: Metadata = {
//   title: 'Product page',
// };

export default function Page() {
   const categories = categoriesData.filter(category => category.isActive);
  
    /**
     * Begins loading mock authentication while page loads
     */
    useEffect(() => {
      mockUserLocalSto();
    }, []);
  
    const handleCategorySelect = (categoryId: string) => {
      console.log('Selected category:', categoryId);
      // Still missing, add later on here: filtering logic
    };
    const cartItemCount = getCartItemCount([]);

    const productCard = [...Array(20)]
   
  return (
  <div className="page-layout">
    <Navbar 
        cartItemCount= {cartItemCount}
        isLoggedIn={true} 
        userName="Rakell"
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />

       <Toolbar 
        categories={categories}
        onCategorySelect={handleCategorySelect}
        isMobile={false}
        
      />

        <main>
          <div className='product-grid'>
            {productCard.map((index) => (
              <div className='product' key={index}>
                <ProductCard/>
              </div>
            ))}
          </div>
        </main>
  </div>
  );
}
