import { Metadata } from 'next';
import Image from 'next/image';
import Navbar from "@/components/navbar";
import Toolbar from "@/components/toolbar";
//import { categoriesData } from '@/data/categories';
import { mockUserLocalSto } from '@/lib/auth';
import { getCartItemCount } from "@/data/cartItems";
import { Button } from '@/components/button';
import { Star } from '@/components/Stars';
import { User } from 'lucide-react';
import  NewReview from '@/components/product/comment-form';
import { 
  getProductbyId, 
  getProductImagebyId,
  getProductReviewsbyId } from '@/lib/product-actions';
import { productsData, productImagesData, productReviewData} from '@/data/products';
 
export const metadata: Metadata = {
  title: 'Product',
};

export default async function ProductPage({ params }:{
  params: Promise<{
    id: number
  }>
}) {
    /*
    *Uncomment when database is ready
    */
    //const productId = (await params).id;
    //const product = await getProductbyId(productId);
    // const productImage = await getProductImagebyId(productId);
    // const productReviews = await getProductReviewsbyId(productId);

    const product = productsData[0];
    const productImage = productImagesData[0];
    const productReviews = productReviewData[0];

    //console.log(product1)

  return (
  <div className="page-layout">
    <Navbar/>  

    <main>
      <div className='product-page'>
        <div className="product-description">
          <div className='imgs-thbn'>
            <Image
            className='thumbnails'
            src={productImage.imageUrl}
            alt='thumbbail'
            width={100}
            height={70}
            />
            <Image
                  className="product-img" 
                  src={productImage.imageUrl}
                  alt="product Image"
                  width={600}
                  height={400}
                  priority
              
                />
          </div>
        
            {/* Product description and details  */}
            <div className='product-details'>
              <h3>{product.name}</h3>
              <p className='price'>${product.price}</p>
              <div className='stars'>{<Star rate={productReviews.rating}/>}</div>
              <p>{product.description}</p>
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
                {productReviewData.map((productReviews, index)=>{
                  return (
                    <div className='review' key={index}>
                  <div className='user-info'>
                    <User size={30}/> 
                    <p>user {productReviews.userId}</p>
                    
                  </div>
                    <h4>{<Star rate={productReviews.rating}/>} {productReviews.title}</h4>
                    <p className='date'>{productReviews.createdAt.toDateString()}</p>
                    <p className='review-text'>{productReviews.reviewText}</p>
                </div>
                  )
                })}
                
          </div>
          {/* Only if session is started. getSession() */}
          <div className="new-comments">
            <NewReview productId={product.id}/>
          </div>
        </div>
      </main>
  </div>
  );
}
