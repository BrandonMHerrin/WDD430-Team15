import MainLayout from '../(main)/layout';
import { getAllProducts } from '@/lib/product-actions';
import { ProductCard } from '@/components/ui/ProductCards';
import { Suspense } from 'react';

export default async function Page() {

    const products = await getAllProducts()
  // console.log(`AQUI${products}`)
    const productCard = [... Array(10)]
  
   
  return (
    <MainLayout>
      <div className="page-layout">
          <div className='product-grid'>
            {productCard.map((product, index) => (
              <div className='product' key={index}>
                  <Suspense fallback={<div>Loading...</div>}>
                  <ProductCard products={products}/>
                  </Suspense>
                
              </div>
            ))}
          </div>       
      </div>
    </MainLayout>
  );
}
