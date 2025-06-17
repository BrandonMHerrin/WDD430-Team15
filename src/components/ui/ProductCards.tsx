'use client'
import Image from "next/image";
import styles from "./embla.module.css";
import { useRouter } from 'next/navigation';
import { 
  getAllProducts, 
  getAllProductImages } from '@/lib/product-actions';
  import {use} from 'react';

export function ProductCard ({products}:{
  products:Promise<{
    id: number;
    description: string;
    price: number;
    name: string;
    storeId: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    }[] | {
    message: string;
  }>
  }
  ) {
  
  // const [ product, images] = await Promise.all([
  //     getAllProducts(), 
  //      getAllProductImages()
  // ]);
   const allproducts = use(products);
    console.log(allproducts)
 //example data to test carousel. This can be updated with the database data
  
  const product = products[Math.floor(Math.random() * products.length)];
  
   const router = useRouter();
    const gotoProduct = () => {
      router.push(`/products/${product.id}/`)
    }
    return (
        <div className={styles.card_div} key={product.id} onClick={gotoProduct}>
            <p className={styles.card_div_p}>{product.title}</p>
            <Image
              className={styles.onSale_img} 
              src={`/embla-carousel/${product.src}`}
              alt="placeholder"
              width={500}
              height={300}
              />
              <div>   
                <p>{product.description}</p>
                <p className={styles.card_div_p}>$ {product.price}</p>
              </div>
        </div>
    )
}