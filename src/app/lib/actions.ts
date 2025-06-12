'use server';
import { prisma } from "@/lib/prisma";

//Product Reviews
export async function createReview(
    title:string, 
    reviewText:string, 
    productId:string, 
    userId:string
    ) {
    try{
        
        prisma.productReview.create({
        data: {
            title,
            reviewText,
            productId,
            userId
      },
    });
    } catch (error) {
        return error && "Failed to create review";
    }
    }
export async function fetchProductReviewsbyId(id:number) {
    try{
        prisma.productReview.findMany({
            where:{ 
                productId:(id)

            }
        })

    } catch (error) {
        return error && "Failed to create review";
    }
}
// export async function fetchUser() {
    
// }
// export async function fetchProduct() {
    
// }