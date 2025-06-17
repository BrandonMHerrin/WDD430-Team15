'use client'
import React, { useEffect } from 'react';
import Navbar from "@/components/navbar";
import Toolbar from "@/components/toolbar";
import { mockUserLocalSto } from '@/lib/auth';
import { getCartItemCount } from "@/data/cartItems";
import { ProductCard } from '@/components/ui/ProductCards';

export default function Page() {
 //const product = await prisma.product.findMany()
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
        onCategorySelect={handleCategorySelect}
      />



        <main>
          <div className='product-grid'>
            {productCard.map((product, index) => (
              <div className='product' key={index}>
                <ProductCard/>
              </div>
            ))}
          </div>
        </main>
  </div>
  );
}
