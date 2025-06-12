// import  style  from "../page.module.css";
//import { createReview } from "@/app/lib/actions";
import { Button } from "@/components/button";
import Link from 'next/link';
import Form from "next/form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default function NewReview({productId}: {productId:string}) {

    const product = productId;
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
                id={product}
                type="text"
                readOnly={true}
                value="User name"
                />
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