import MainLayout from '../(main)/layout';
import { ProductCard } from '@/components/ui/ProductCards';
import { Suspense } from 'react';
import { getAllProducts } from '@/lib/product-actions'

export default async function Page() {

    const products = await getAllProducts()
    if ('message' in products) {
    return <div>Error: {products.message}</div>;
    }
 
  
   
  return (
    <MainLayout>
      <div className="page-layout">
          <div className='product-grid'>
            {products.slice(0, 10).map((product) => (
              <div className='product' key={product.id}>                
                  <ProductCard product={product}/>
                
              </div>
            ))}
          </div>       
      </div>
    </MainLayout>
  );
}
