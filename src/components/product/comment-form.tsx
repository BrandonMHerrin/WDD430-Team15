'use client'
import { createReview, NewReviewState } from "@/lib/product-actions";
import { Button } from "@/components/button";
import Form from "next/form";
import { useActionState } from "react";
import { RateProduct } from "../Stars";
import { Product } from "@/types/product";
import { useSession } from "next-auth/react";

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
     const { data: session } = useSession();
     console.log("SESSION", session);
     if (!session) {
        return <div className="new-review-container">
            <p>Log in to make a comment about this product</p>
            </div>
  
        }

     const userId: string | null | undefined = session?.user?.image;
    return(
        <Form action={formAction}>
            <div className="new-review-container">
                <p>{userId}</p>
                <div className="new-review">
                    <input
                    name="productId"
                    value={product.id}
                    readOnly={true}
                    type="hidden"
                    />
                    {userId && (
                        <input 
                        name="userId" 
                        type="hidden" 
                        value={userId} 
                        readOnly />
                    )}
                    <RateProduct/>
                    <input
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Title"
                    required
                    />
                    <textarea 
                    name="reviewText" 
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