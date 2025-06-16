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
        message: null,
        success: false
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
                    value={1}
                  
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
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                  {state.errors?.productId &&
                  state.errors.productId.map((error: string) => (
                  <p className="error" key={error}>
                  {error}
                  </p>
                ))}
          </div>
            <div className="review-bts">
                <Button type="submit">Send Review</Button>
            </div>
            </div>
           
        </Form>
        
    )
}