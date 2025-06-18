//example API=> https://codesandbox.io/p/sandbox/pp4c69?file=%2Fsrc%2Fjs%2Findex.tsx%3A4%2C11
"use client";
import React, { Suspense, useCallback } from 'react'
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import  styles  from "./embla.module.css"
import { ProductCard } from "./ProductCards";
/* import { 
  getAllProducts} from '@/lib/product-actions';
import {use} from 'react'; */


// Copy of oroduct interface
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  storeId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  store?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
  primaryImage?: {
    id: number;
    productId: number;
    imageUrl: string;
    sortOrder: number;
    fileType: string;
  } | null;
}

type PropType = {
  slides: number[]
  options?: EmblaOptionsType,
  products: Product[]
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, products } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop

    resetOrStop()
  }, [])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi, onNavButtonClick)

  /* const products = use(getAllProducts())
  if ('message' in products) {
    return <div>Error: {products.message}</div>;
    } */

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }


  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => {
            // Get the product for this slide, cycle through Brnadom database products
            const product = products[index % products.length];
            
            return (
              <div className={styles.embla__slide} key={index}>
                <div className={styles.embla__slide__number}>
                  {/* Pass individual product instead of array */}
                  <ProductCard product={product} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
