'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import ClientLayout from '@/components/ClientLayout';
import { Button } from '@/components/button';
import { Star } from '@/components/Stars';
import { User, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';
import NewReview from '@/components/product/comment-form';
import { 
  getProductbyId, 
  getProductImagebyId,
  getProductReviewsbyId } from '@/lib/product-actions';
import { addToCart } from '@/lib/cart-actions';
import { notFound, useRouter } from 'next/navigation';
import {use, useState, useEffect } from 'react';
import styles from './ProductPage.module.css';
import { mockUserLocalSto, isAuthenticated } from '@/lib/auth';

import { Product, ProductImage, ProductReview } from '@/types/product';

interface ProductPageProps {
  params: Promise<{
    id: string  
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [productImage, setProductImage] = useState<ProductImage | null>(null);
  const [productReviews, setProductReviews] = useState<ProductReview[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    async function fetchProductData() {
      try {
        const resolvedParams = await params;
        const productId = Number(resolvedParams.id);
        
        console.log('Fetching product with ID:', productId);
        
        const foundProduct = await getProductbyId(productId);
        const foundImage = await getProductImagebyId(productId);
        const foundReviews = await getProductReviewsbyId(productId);
        
        console.log('Product data:', foundProduct);
        console.log('Image data:', foundImage);
        console.log('Reviews data:', foundReviews);
        
        // Check if the responses are error objects
        if (foundProduct && !('message' in foundProduct)) {
          // Create a complete Product object with required fields
          const completeProduct: Product = {
            id: productId,
            name: foundProduct.name,
            description: foundProduct.description,
            price: Number(foundProduct.price),
            storeId: 0, 
            categoryId: 0, 
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setProduct(completeProduct);
        } else {
          console.error('Product not found with ID:', productId);
          router.push('/products');
          return;
        }
        
        if (foundImage && !('message' in foundImage)) {
          setProductImage(foundImage as ProductImage);
        } else {
          console.warn('No image found for product:', productId);
          setProductImage(null);
        }
        
        if (foundReviews && !('message' in foundReviews)) {
          setProductReviews(Array.isArray(foundReviews) ? foundReviews : []);
        } else {
          setProductReviews([]);
        }
        
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    }

    fetchProductData();
  }, [params, router]);

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

  // Early returns should be at the top level, not nested
  if (loading) {
    return (
      // <ClientLayout isLoggedIn={isAuthenticated()} cartItemCount={0}>
      // </ClientLayout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <p>Loading product...</p>
        </div>
    );
  }

  if (!product) {
    return (
      // <ClientLayout isLoggedIn={isAuthenticated()} cartItemCount={0}>
      // </ClientLayout>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist.</p>
        </div>
    );
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
        productImage as ProductImage, 
        quantity,
        'Artisan Store'
      );

      if (result.success) {
        setNotification({
          type: 'success',
          message: 'Product added to cart successfully!'
        });
        
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
    setTimeout(() => {
      router.push('/cart');
    }, 1000);
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  return (
    // <ClientLayout isLoggedIn={isAuthenticated()} cartItemCount={0}>
    // </ClientLayout>
    <>
      {/* Notification Banner */}
      {notification.type && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          <div className={styles.notificationContent}>
            {notification.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      <div className={styles.pageLayout}>
        <div className={styles.productPage}>
          <div className={styles.productDescription}>
            <div className={styles.imgsThbn}>
              {productImage ? (
                <>
                  <Image
                    className={styles.thumbnails}
                    src={productImage.imageUrl}
                    alt={`thumbnail image ${product.name}`}
                    width={100}
                    height={70}
                  />
                  <Image
                    className={styles.productImg} 
                    src={productImage.imageUrl}
                    alt={`product Image ${product.name}`}
                    width={600}
                    height={400}
                    priority
                  />
                </>
              ) : (
                <div className={styles.noImage}>
                  <p>No image available</p>
                </div>
              )}
            </div>
          
            
            <div className={styles.productDetails}>
              <h3>{product.name}</h3>
              <p className={styles.price}>${product.price}</p>
              <div className={styles.stars}>
                <Star rate={productReviews.length > 0 ? productReviews[0].rating : 5}/>
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
                  className={styles.buyNow} 
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
            {productReviews && productReviews.length > 0 ? (
              productReviews.map((productReview, index) => (
                <div className={styles.review} key={index}>
                  <div className={styles.userInfo}>
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

        
          <div className={styles.newComments}>
            <NewReview product={product}/>
          </div>
        </div>
      </div>
    </>
  );
}