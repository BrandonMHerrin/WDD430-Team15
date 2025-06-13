import Image from "next/image";
import styles from "./embla.module.css";
import { useRouter } from 'next/navigation';

export function ProductCard () {
  
  // const [ product, images] = await Promise.all([
  //   fetchAllProducts(), 
  //   fetchAllImages()
  // ]);
  // const randomProduct = [];

 //example data to test carousel. This can be updated with the database data
  const products = [
    {
      id:1,
    title: "Wood Bird",
    src:"bird-7004262_1920_Albrecht-Fietz_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 30   
    }, 
    {
      id: 2,
    title: "Lacquer Ware",
    src:"lacquer-ware-3130729_1920_Allan-Lau_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 25   
    }, 
    {
      id: 3,
    title: "Cristal Mushrooms",
    src:"mushrooms-7236946_1920_guangWu-Yang_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 10   
    }, 
    {
      id: 4,
    title: "Pendant",
    src:"pendant-7633875_1920_ninablackship_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 35   
    }, 
    {
      id: 5,
    title: "Tree of Life",
    src:"tree-of-life-7532428_1920_ninablacksheep_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 5   
    }, 
    {
      id: 6,
    title: "Tea Set",
    src:"tea-set-8022928_1920_hartono-subagio_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 40   
    }, 
  ]
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