import { Product, ProductImage } from "../types/product"

export const productsData: Product[] = [
    {
        id: 1,
        name: "Wood Bird",
        description: "Lovely bird made of pine wood",
        price: 30,
        storeId: 1, 
    }, 
    {
        id: 2,
        name: "Lacquer Ware",
        description: "Lovely bird made of pine wood",
        price: 25,
        storeId: 1,   
    }, 
    {
        id: 3,
        name: "Cristal Mushrooms",
        description: "Lovely bird made of pine wood",
        price: 10,
        storeId: 1,   
    }, 
    {
        id: 4,
        name: "Pendant",
        description: "Lovely bird made of pine wood",
        price: 35,
        storeId: 1,  
    }, 
    {
        id: 5,
        name: "Tree of Life",
        description: "Lovely bird made of pine wood",
        price: 5,
        storeId: 1,   
    }, 
    {
        id: 6,
        name: "Tea Set",
        description: "Lovely bird made of pine wood",
        price: 40,
        storeId: 1,   
    }, 
  ]

  export const productImagesData: ProductImage[] = [
    {
        id: 1,
        productId: 1,
        imageUrl:"../embla-carousel/bird-7004262_1920_Albrecht-Fietz_Pixabay.jpg", 
 
    }, 
    {
        id: 2,
        productId: 2,
        imageUrl:"lacquer-ware-3130729_1920_Allan-Lau_Pixabay.jpg", 

    }, 
    {
        id: 3,
        productId: 3,
        imageUrl:"mushrooms-7236946_1920_guangWu-Yang_Pixabay.jpg", 
  
    }, 
    {
        id: 4,
        productId: 4,
        imageUrl:"pendant-7633875_1920_ninablackship_Pixabay.jpg", 

    }, 
    {
        id: 5,
        productId: 5,
        imageUrl:"tree-of-life-7532428_1920_ninablacksheep_Pixabay.jpg", 

    }, 
    {
        id: 6,
        productId: 6,
        imageUrl:"tea-set-8022928_1920_hartono-subagio_Pixabay.jpg", 
 
    },
  ]

