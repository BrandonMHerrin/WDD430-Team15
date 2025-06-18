'use client'
import Image from "next/image";
import styles from "./embla.module.css";
import { useRouter } from 'next/navigation';
import { Product } from "@/types/product";

interface ProductProps {
  product: Product
}

export function ProductCard ({product}: ProductProps) {

   const router = useRouter();
    const gotoProduct = () => {
      router.push(`/products/${product.id}/`)
    }
    return (
        <div className={styles.card_div} key={product.id} onClick={gotoProduct}>
            <p className={styles.card_div_p}>{product.name}</p>
            <Image
              className={styles.onSale_img} 
              src={product.primaryImage?.imageUrl ?? '/public/placeholder.png'}
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