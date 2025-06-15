'use client'
//import { createReview } from "@/lib/product-actions";
import { Button } from "@/components/button";
import Link from 'next/link';
import Form from "next/form";
// import { useActionState } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RateProduct } from "../Stars";


export default function NewReview({productId}: {productId:number}) {
    // const product = productId;
    // const initialState: NewReviewState = {
    //     errors: {},
    //     message: null
    // }
    //  const [state, formAction] = useActionState(createReview, initialState);
//     async function formSubmit(formData: FormData) {
        
//         const title = formData.get('title') as string;
//         const reviewText = formData.get('review') as string;
//         const productId = formData.get('productId') as string;
//         const userId = formData.get('userId') as string;    
        
//    //     await createReview(title, reviewText, productId, userId)
//         revalidatePath("/product/{id}");
//         redirect("/product/{id}");
//     }
    return(
        <Form action="{formSubmit}">
            <div className="new-review-container">
                <div className="new-review">
                <input 
                name="user name" 
                id="userId"
                type="text"
                readOnly={true}
                value="User name"
                />
                <RateProduct/>
                <textarea placeholder="Leave your opinion on the product" ></textarea>
            </div>
            <div className="review-bts">
                <Link 
                href="product/{id}">
                    Cancel
                </Link>
                <Button type="submit">Send Review</Button>
            </div>
            </div>
           
        </Form>
        
    )
}