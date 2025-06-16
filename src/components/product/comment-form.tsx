'use client'
import { createReview, NewReviewState } from "@/lib/product-actions";
import { Button } from "@/components/button";
import Link from 'next/link';
import Form from "next/form";
import { useActionState } from "react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { RateProduct } from "../Stars";


export default function NewReview({productId}: {productId:number}) {
    const product = productId;
    const initialState: NewReviewState = {
        errors: {},
        message: null
    }
     const [state, formAction] = useActionState(createReview, initialState);

    return(
        <Form action={formAction}>
            <div className="new-review-container">
                <div className="new-review">
                    <input
                    name="productId"
                    value={productId}
                    readOnly={true}
                    type="hidden"
                    />
                    <input 
                    name="userId" 
                    id="userId"
                    type="hidden"
                    readOnly={true}
                    value="User name"
                  
                    />
                    <RateProduct/>
                    <input
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Title"
                    />
                    <textarea name="review-text" placeholder="Leave your opinion on the product" ></textarea>
                </div>
            <div className="review-bts">
                {/* <Link 
                href={`product/${productId}`}>
                    Cancel
                </Link> */}
                <Button type="submit">Send Review</Button>
            </div>
            </div>
           
        </Form>
        
    )
}