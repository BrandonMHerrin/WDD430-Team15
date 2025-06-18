'use client'
import Image from "next/image";
import styles from "./embla.module.css";
import { useRouter } from 'next/navigation';

export type Product = {
  id: number;
  description: string;
  price: string;
  name: string;
  storeId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
}
export function ProductCard ({product}:{ product: Product}
  ) {

   const router = useRouter();
    const gotoProduct = () => {
      router.push(`/products/${product.id}/`)
    }
    return (
        <div className={styles.card_div} key={product.id} onClick={gotoProduct}>
            <p className={styles.card_div_p}>{product.name}</p>
            <Image
              className={styles.onSale_img} 
              src={`/embla-carousel/{product}`}
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