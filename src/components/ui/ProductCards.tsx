'use client'
import Image from "next/image";
import styles from "./embla.module.css";
import { useRouter } from 'next/navigation';



interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  storeId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  store?: { id: number; name: string;};
  category?: {id: number; name: string; };
  primaryImage?: {id: number;
    productId: number;
    imageUrl: string;
    sortOrder: number;
    fileType: string;
  } | null;
}


export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  
  const gotoProduct = () => {
    router.push(`/products/${product.id}/`);
  };

  const imageUrl = product.primaryImage?.imageUrl || '/images/placeholder-product.jpg';

  return (
    <div className={styles.card_div} key={product.id} onClick={gotoProduct}>
      <p className={styles.card_div_p}>{product.name}</p>
      <Image
        className={styles.onSale_img} 
        src={imageUrl} 
        alt={product.name} 
        width={500}
        height={300}
        onError={(e) => {
          // Fallback if image fails to load
          const target = e.target as HTMLImageElement;
          target.src = '/images/placeholder-product.jpg';
        }}
      />
      <div>   
        <p>{product.description}</p>
        <p className={styles.card_div_p}>$ {product.price.toFixed(2)}</p>
        
        {product.store && (
          <p className={styles.store_name}>by {product.store.name}</p>
        )}
      </div>
    </div>
  );
}