import { getProductbyId, getAllProducts } from "@/lib/product-actions";

export async function productsData() {
    const products = await getAllProducts()
     if ('message' in products) {
    return <div>Error: {products.message}</div>;
  }
  return products
}