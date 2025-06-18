'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import MainLayout from "@/app/(main)/layout";
import { Button } from '@/components/button';
import { Star } from '@/components/Stars';
import { User, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';
import NewReview from '@/components/product/comment-form';
import { 
  getProductbyId, 
  getProductImagebyId,
  getProductReviewsbyId } from '@/lib/product-actions';
import { productsData, productImagesData, productReviewData} from '@/data/products';
import { addToCart } from '@/lib/cart-actions';
import { notFound, useRouter } from 'next/navigation';
import {use, useState, useEffect } from 'react';
import styles from './ProductPage.module.css';
import { mockUserLocalSto, isAuthenticated } from '@/lib/auth';
import { ProductClient } from '@/types/product';

interface ProductPageProps {
  params: Promise<{
    id: number
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const productId = Number(use(params).id);
  const [product, setProduct] = useState(productsData[0]);
  const [productImage, setProductImage] = useState(productImagesData[0]);
  const [productReviews, setProductReviews] = useState(productReviewData[0]); // Added a [0] because it was not finding the nested object without it
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    mockUserLocalSto();
  }, []);

  // notification auto-hide
  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [notification]);

  //productsData
  // useEffect(()=> {
  //   getProductbyId(productId).then(data => {
  //     if ('message' in data) {
  //       console.error(data.message);
  //       return; 
  //       }
  //     setProduct(data)
  //   })
  // })

  // Early returns should be at the top level, not nested
  if (!product) {
    notFound();
    return null; // This ensures we don't continue execution
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      setNotification({
        type: 'error',
        message: 'Please log in to add items to your cart'
      });
      return;
    }

    setIsAddingToCart(true);

    try {
      const result = addToCart(
        product, 
        productImage, 
        quantity,
        'Artisan Store' // Connect to Brandon database to have it dynamically
      );

      if (result.success) {
        setNotification({
          type: 'success',
          message: 'Product added to cart successfully!'
        });
        
        // Reset quantity to 1 after successful add
        setQuantity(1);
      } else {
        setNotification({
          type: 'error',
          message: result.message
        });
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to add product to cart'
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to cart after adding
    setTimeout(() => {
      router.push('/cart');
    }, 1000);
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  return (
    // <MainLayout>

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
              <p className={styles.price}>${product.price}</p>
              <div className="stars">
                <Star rate={productReviews?.rating || 5}/>
              </div>
              <p>{product.description}</p>
              <p className={styles.status}>In Stock</p>
             
              <div className={styles.quantitySection}>
                <label htmlFor='quantity'>Quantity: </label>
                <select 
                  name='quantity' 
                  id='quantity'
                  value={quantity}
                  onChange={handleQuantityChange}
                >
                  {[...Array(10)].map((_, i) => i + 1)
                    .map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))
                  }
                </select>
              </div>

              <div className={styles.actionButtons}>
                <Button 
                  className={styles.addCart} 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  <ShoppingCart size={18} />
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
                
                <Button 
                  className={`${styles.buyNow}`} 
                  onClick={handleBuyNow}
                  disabled={isAddingToCart}
                >
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
          
          {/* Reviews and comments */}
          <div className={styles.reviewsContainer}>
            <h3>Top Reviews of this product</h3>
            {productReviewData && productReviewData.length > 0 ? (
              productReviewData.map((productReview, index) => (
                  <div className={"review"} key={index}>
                  <div className={"user-info"}>
                    <User size={30}/> 
                    <p>user {productReview.userId}</p>
                  </div>
                  <h4>
                    <Star rate={productReview.rating}/> {productReview.title}
                  </h4>
                  <p className={styles.date}>{productReview.createdAt.toDateString()}</p>
                  <p className={styles.reviewText}>{productReview.reviewText}</p>
                </div>
              ))
            ) : (
              <div><p>There are no reviews about this product yet.</p></div>
            )}
          </div>

          {/* Only if session is started */}
          <div className={styles.newComments}>
            <NewReview productId={product.id}/>
          </div>
        </div>
      
      </div>
    // </MainLayout>
  );
}