'use server';
import prisma from "./prisma-client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

const ProductReviewSchema = z.object({
    id: z.number(),
    title: z.string(),
    reviewText: z.string(),
    rating: z.coerce.number(),
    productId: z.coerce.number(),
    userId: z.coerce.number(),

})
const CreateReviews = ProductReviewSchema.omit({id:true})

export async function getAllProducts() {
    try {
       const products = await prisma.product.findMany()
       //console.log(products)
        return JSON.stringify(products)
    } catch (error) {
        return { message: "Failed to get products"};
    }
    
}
export async function getProductbyId(productId:number) {
    try {
       const product = await prisma.product.findUnique({
            where:{ 
                id:productId
            },
            select: {
                name: true,
                description: true,
                price: true
            }
        })
        // console.log(product)
        return product
    } catch (error) {
        return { message: "Failed to get product"};
    }
    
}

export async function getAllProductImages() {
    try {
        const images = prisma.productImage.findMany()
        return images
    } catch (error) {
        return { message: "Failed to get images"};
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
        return { message: "Failed to get image"};
    }
}

//Product Reviews
export async function getAllProductReviews() {
    try{
        const reviews = prisma.productReview.findMany()
        return reviews

    } catch (error) {
        return { message: "Failed to get reviews"};
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
        return { message: "Failed to get review"};
    }
}

export type NewReviewState = {
    errors?: {
        title?: string[];
        reviewText?: string[];
        rating?: string[];
        productId?: string[];
        userId?: string[]
    };
    message?: string | null;
    success?: boolean;
}

export async function createReview(
    prevState: NewReviewState | undefined,
    formData: FormData) {
        console.log("creating Review")
        const validatedFields = CreateReviews.safeParse({
            title : formData.get('title'),
            reviewText : formData.get('review-text'),
            rating: formData.get('rating'),
            productId : formData.get('productId'),
            userId : formData.get('userId'),
        })

        if (!validatedFields.success) {
        console.error('Failed to validate input data.')
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Missing Fields. Failed to Create Review",
          success: false
            };
        }

        const { title, reviewText, rating, productId, userId } = validatedFields.data;

    try{
        
       const result = prisma.productReview.create({
        data: {
            title,
            reviewText,
            rating,
            productId,
            userId,
            
            },
        });
        if (!result) {
          return {
            errors: {},
            message: 'Failed to create review.',
            success: false
          }
        }
        console.log('Successfully created review.')
        revalidatePath("/product/{id}");
        redirect('/product/{id}');
        
    } catch (error) {
         console.error(`Review creation error: ${error}`);
         
        return {
          errors: {},
          message: "Database error. Please try again.",
          success: false
    };
    
    }
    }

