'use server';
import prisma from "./prisma-client";
import { z } from "zod";


export async function getAllProducts() {
    try {
       const products = await prisma.product.findMany()
        return products
    } catch (error) {
        return error && "Failed to get products";
    }
    
}
export async function getProductbyId(id:number) {
    try {
       const product = await prisma.product.findUnique({
            where:{ 
                id:id
        }})
        return product
    } catch (error) {
        return error && "Failed to get product";
    }
    
}

export async function getAllProductImages() {
    try {
        const images = prisma.productImage.findMany()
        return images
    } catch (error) {
        return error && "Failed to get image";
    }
}
export async function getProductImagebyId(id:number) {
    try {
        const image = prisma.productImage.findFirst({
            where:{ 
                productId:(id)
        }})
        return image
    } catch (error) {
        return error && "Failed to get image";
    }
}

//Product Reviews
export async function getAllProductReviews() {
    try{
        const reviews = prisma.productReview.findMany()
        return reviews

    } catch (error) {
        return error && "Failed to get review";
    }
}
export async function getProductReviewsbyId(id:number) {
    try{
        const review = prisma.productReview.findMany({
            where:{ 
                productId:(id)

            }
        })
        return review

    } catch (error) {
        return error && "Failed to get review";
    }
}
// export async function createReview(
//     title:string, 
//     reviewText:string, 
//     productId:number, 
//     userId:number
//     ) {
//     try{
        
//        const review = prisma.productReview.create({
//         data: {
//             title: title,
//             reviewText:reviewText,
//             productId:productId,
//             userId:userId
//       },
//     });
//     } catch (error) {
//         return error && "Failed to create review";
//     }
//     }

