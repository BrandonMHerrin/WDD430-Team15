'use client'
//import { Metadata } from 'next';
import React, { Usable, useEffect, useId } from 'react';
import Image from 'next/image';
import Navbar from "@/components/navbar";
import Toolbar from "@/components/toolbar";
import { categoriesData } from '@/data/categories';
import { mockUserLocalSto } from '@/lib/auth';
import { getCartItemCount } from "@/data/cartItems";
import { Button } from '@/components/button';
import Star from '@/components/Stars';
import { User } from 'lucide-react';
import  NewReview from '@/components/product/comment-form';
// import { 
//   fetchProductReviewsbyId, 
//   fetchProductImagebyId,
//   fetchProductReviewsbyId } from '@/lib/actions-test';
import { useRouter } from 'next/navigation';
import { productsData, productImagesData} from '@/data/products';
 
// export const metadata: Metadata = {
//   title: 'Product page',
// };

export default function ProductPage({ params }:{
  params: Promise<{
    id: number
  }>
}) {
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

  // const reviews = await getProductbyId();
  // const reviews = await getProductImagebyId();
  // const reviews = await getProductReviewsbyId();
 // const router = useRouter();
  const id = React.use(params);
  const data = productsData[0];
  const image = productImagesData[0];
  //console.log(data)

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
      <div className='product-page'>
        <div className="product-description">
          <div className='imgs-thbn'>
            <Image
            className='thumbnails'
            src={image.imageUrl}
            alt='thumbbail'
            width={100}
            height={70}
            />
            <Image
                  className="product-img" 
                  src={image.imageUrl}
                  alt="product Image"
                  width={600}
                  height={400}
                  priority
              
                />
          </div>
        
            {/* Product description and details  */}
            <div className='product-details'>
              <h3>{data.name}</h3>
              <p className='price'>${data.price}</p>
              <div className='stars'>{<Star rate={4}/>}</div>
              <p>{data.description}</p>
              <p className='status'>In Stock</p>
              <label htmlFor='Quantity'>Quantity  </label>
              <select name='Quantity' defaultValue={1}>{[...Array(10)].map((_, i) => i + 1)
                        .map(i => <option key={i} value={i}>{i}</option>)}</select>
              <Button className='btn'>Buy Now</Button>
              <Button className='add-cart'>Add to Cart</Button>
            </div>
            </div>
          
          {/* //Reviews and comments */}
          <div className="reviews_container">
            <h3>Top Reviews of this product</h3>
            
              <div className='review'>
                <div className='user-info'>
                  <User size={50}/> 
                  <p>user name</p>
                  
                </div>
                  <h4>{<Star rate={4}/>} Review title</h4>
                  <p className='date'>dd/mm/yyyy hh/mm/ss</p>
                  <p className='review-text'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus consequatur labore magni mollitia est ab eaque, maxime modi, suscipit optio, quo quod cum aspernatur hic deleniti sapiente quam veniam blanditiis.</p>
              </div>
          </div>
          {/* Only if session is started. getSession() */}
          <div className="new-comments">
          <NewReview productId={1}/>
          </div>
        </div>
        </main>
  </div>
  );
}
