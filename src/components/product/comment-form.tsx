'use client'
import { createReview, NewReviewState } from "@/lib/product-actions";
import { Button } from "@/components/button";
import Form from "next/form";
import { useActionState } from "react";
import { RateProduct } from "../Stars";
import { Product } from "@/types/product";

interface ProductProps {
    product: Product
}

export default function NewReview({ product }:ProductProps) {
 
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
                    value={product.id}
                    readOnly={true}
                    type="hidden"
                    />
                    <input 
                    name="userId" 
                    id="userId"
                    type="hidden"
                    readOnly={true}
                    value={3}
                  
                    />
                    <RateProduct/>
                    <input
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Title"
                    required
                    />
                    <textarea 
                    name="review-text" 
                    placeholder="Leave your opinion on the product"
                     ></textarea>
                </div>
                <div id="customer-error" aria-live="polite" aria-atomic="true">
                  {state?.errors?.productId &&
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