import Image from "next/image";
import styles from "./embla.module.css";

export function OnSaleCard () {
 //example data to test carousel. This can be updated with the database data
  const images = [
    {
    title: "Wood Bird",
    src:"bird-7004262_1920_Albrecht-Fietz_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 30   
    }, 
    {
    title: "Lacquer Ware",
    src:"lacquer-ware-3130729_1920_Allan-Lau_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 25   
    }, 
    {
    title: "Cristal Mushrooms",
    src:"mushrooms-7236946_1920_guangWu-Yang_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 10   
    }, 
    {
    title: "Pendant",
    src:"pendant-7633875_1920_ninablackship_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 35   
    }, 
    {
    title: "Tree of Life",
    src:"tree-of-life-7532428_1920_ninablacksheep_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 5   
    }, 
    {
    title: "Tea Set",
    src:"tea-set-8022928_1920_hartono-subagio_Pixabay.jpg", 
    description: "Lovely bird made of pine wood",
    price: 40   
    }, 
  ]
  const randomImg = images[Math.floor(Math.random() * images.length)];
    return (
        <div className={styles.card_div}>
            <p className={styles.card_div_p}>{randomImg.title}</p>
            <Image
              className={styles.onSale_img} 
              src={`/embla-carousel/${randomImg.src}`}
              alt="placeholder"
              width={500}
              height={300}
              />
              <div>   
                <p>{randomImg.description}</p>
                <p className={styles.card_div_p}>$ {randomImg.price}</p>
              </div>
        </div>
    )
}