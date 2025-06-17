import prisma from "@/lib/prisma-client";
import { Metadata } from 'next';
import Image from 'next/image';
import MainLayout from "@/app/(main)/layout";
import { Button } from '@/components/button';
import { Star } from '@/components/Stars';
import { User } from 'lucide-react';
import  NewReview from '@/components/product/comment-form';
import { 
  getProductbyId, 
  getProductImagebyId,
  getProductReviewsbyId } from '@/lib/product-actions';
import { productsData, productImagesData, productReviewData} from '@/data/products';
import { notFound } from 'next/navigation';



export const metadata: Metadata = {
  title: 'Product',
};

export default async function ProductPage({ params }:{
  params: Promise<{
    id: number
  }>
}) {

    async function getProductbyId(productId:number) {
    try {
       const product = await prisma.product.findUnique({
            where:{ 
                id:productId
            },
            select: {
                name: true,
                description: true,
                price: true
            }
        })
        // console.log(product)
        return product
    } catch (error) {
        if (error instanceof Error){
        console.log("Error: ", error.stack)
        }
    }
    
    }

    async function getProductImagebyId(id:number) {
      try {
          const image = prisma.productImage.findMany({
              where:{ 
                  productId:id
          }, select:{
            imageUrl: true
          }})
          console.log(image)
          return image
      } catch (error) {
          if (error instanceof Error){
          console.log("Error: ", error.stack);
      }

      }
    }

    async function getProductReviewsbyId(id:number) {
        try{
            const review = prisma.productReview.findMany({
                where:{ 
                    productId:id
                
                },
                take: 3
            })
            console.log(review)
            return review
          
        } catch (error) {
            if (error instanceof Error){
             console.log("Error: ", error.stack);
        }
        }
      }
    /*
    *Uncomment when database is ready
    */
    const productId = Number((await params).id);
    const product = await getProductbyId(productId)
   // const productImage = await getProductImagebyId(productId);
    const productReviews = await getProductReviewsbyId(productId);

     //const product = productsData[0];
     const productImage = productImagesData[0];
     //const productReviews = productReviewData[0];

    if (!product) {
    notFound();
    }  
    if (!productReviews) {
      return <div><p>There are no reviews about this product yet.</p></div>
    }

    console.log(productReviews)

    const handleAddToCart = (product: object, quantity: number) =>{
      const cart = localStorage.getItem("cart-section") || [];
      

      }
    
  return (
    <MainLayout>

  <div className="page-layout">
      <div className='product-page'>
        <div className="product-description">
          <div className='imgs-thbn'>
            <Image
            className='thumbnails'
            src={productImage.imageUrl}
            alt={`thumbbail image ${productImage.imageUrl}`}
            width={100}
            height={70}
            />
            <Image
                  className="product-img" 
                  src={productImage.imageUrl}
                  alt={`product Image ${productImage.imageUrl}`}
                  width={600}
                  height={400}
                  priority
                  
                />
          </div>
        
            {/* Product description and details  */}
            <div className='product-details'>
              <h3>{product.name}</h3>
              <p className='price'>${product.price.toString()}</p>
              <div className='stars'>{<Star rate={4}/>}</div>
              <p>{product.description}</p>
              <p className='status'>In Stock</p>
             
                <label htmlFor='Quantity'>Quantity  </label>
                <select name='Quantity' defaultValue={1}>{
              [...Array(10)].map((_, i) => i + 1)
                        .map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              <Button className='add-cart' >Add to Cart</Button>
              <Button className='btn'>Buy Now</Button>
              
              
              
            </div>
            </div>
          
          {/* //Reviews and comments */}
          <div className="reviews_container">
            <h3>Top Reviews of this product</h3>
                {productReviews?.map((review)=>(
                  <div className='review' key={review.id}>
                  <div className='user-info'>
                    <User size={30}/> 
                    <p>user {review.userId}</p>
                    
                  </div>
                    <h4>{<Star rate={review.rating}/>} {review.title}</h4>
                    <p className='date'>{review.createdAt.toDateString()}</p>
                    <p className='review-text'>{review.reviewText}</p>
                </div>
                ))
              }
                <div><p>There are no reviews about this product yet.</p></div>
    
          </div>
          {/* Only if session is started. getSession() */}
          <div className="new-comments">
            <NewReview productId={productId}/>
          </div>
        </div>
      
      </div>
    </MainLayout>
  );
}
