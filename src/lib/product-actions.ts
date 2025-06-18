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

export async function getAllProducts(){
    try {
       const products = await prisma.product.findMany( {
          include: {
               store: {select: {id: true, name: true}  },
               category: {select: {id: true, name: true}  },
               productImages: { orderBy: {sortOrder: 'asc'}, take: 1},    },
           orderBy: {createdAt: 'desc' }
       })
    
        return products.map (product => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: Number(product.price), 
            storeId: product.storeId,
            categoryId: product.categoryId,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            store: product.store,
            category: product.category,
            primaryImage: product.productImages[0] || null

        }))
    } catch (error) {
        console.error(error);
        return { message: "Failed to get products"};
    }
    
}
export async function getProductbyId(productId: number) {
    try {
       const product = await prisma.product.findUnique({
            where: { 
                id: productId
            },
            include: {
                store: { select: { id: true, name: true } },
                category: { select: { id: true, name: true } },
                productImages: { orderBy: { sortOrder: 'asc' }, take: 1 }
            }
        })
        
        if (!product) {
            return { message: "Product not found" };
        }
        
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            storeId: product.storeId,
            categoryId: product.categoryId,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            store: product.store,
            category: product.category,
            primaryImage: product.productImages[0] || null
        };
    } catch (error) {
        console.error(error);
        return { message: "Failed to get product" };
    }
}

export async function getAllProductImages() {
    try {
        const images = await prisma.productImage.findMany()
        return images
    } catch (error) {
        return { message: "Failed to get images"};
    }
}
export async function getProductImagebyId(id: number) {
    try {
        const image = await prisma.productImage.findFirst({
            where: { 
                productId: id
            }
        });
        return image;
    } catch (error) {
        return { message: "Failed to get image" };
    }
}

//Product Reviews
export async function getAllProductReviews() {
    try{
        const reviews = await prisma.productReview.findMany()
        if (!reviews) return { message: 'Reviews not found' };
        return reviews

    } catch (error) {
        return { message: "Failed to get reviews"};
    }
}

export async function getProductReviewsbyId(id:number) {
    try{
        const review = await prisma.productReview.findMany({
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
            reviewText : formData.get('reviewText'),
            rating: formData.get('rating'),
            productId : formData.get('productId'),
            userId : formData.get('userId'),
        })
        console.log(validatedFields)

        if (!validatedFields.success) {
        console.error('Failed to validate input data.')
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Missing Fields. Failed to Create Review",
          success: false,
            };
        }

        const { title, reviewText, rating, productId, userId } = validatedFields.data;

    try{
        
       const result = await prisma.productReview.create({
        data: {
            title,
            reviewText,
            rating:Number(rating),
            productId:Number(productId),
            userId:Number(userId),
            
            },
        });
        if (!result) {
          return {
            errors: {},
            message: 'Failed to create review.',
            success: false
          }
        }
        console.log(result)
        console.log('Successfully created review.')
        revalidatePath(`/products/${productId}`);
//        redirect('/products/');
        return {
            errors: {},
            message: 'Review created successfully.',
            success: true
    };
        
    } catch (error) {
         console.error(`Review creation error: ${error}`);
         
        return {
          errors: {},
          message: "Database error. Please try again.",
          success: false
    };
    
    }
    }

