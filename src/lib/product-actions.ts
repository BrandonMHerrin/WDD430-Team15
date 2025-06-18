'use server';
import prisma from "./prisma-client";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import { ProductClient } from "@/types/product";

const ProductReviewSchema = z.object({
    id: z.number(),
    title: z.string(),
    reviewText: z.string(),
    rating: z.coerce.number(),
    productId: z.coerce.number(),
    userId: z.coerce.number(),

})
const CreateReviews = ProductReviewSchema.omit({id:true})

export async function getAllProducts(): Promise<ProductClient[] | { message: string }> {
    try {
       const products = await prisma.product.findMany()
        const safeProducts: ProductClient[] = products.map(product => ({
      ...product,
      price: product.price.toString(), 
        }));
        return safeProducts
    } catch (error) {
        console.error(error);
        return { message: "Failed to get products"};
    }
    
}
export async function getProductbyId(productId:number) {
    try {
       const product = await prisma.product.findUnique({
            where:{ 
                id:productId
            }
        })
        if (!product) return { message: 'Product not found' };
        // console.log(product)
        return {
      ...product,
      price: product.price.toString(), 
    };
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
        if (!reviews) return { message: 'Reviews not found' };
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
        if (!review) return { message: 'Review not found' };
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

