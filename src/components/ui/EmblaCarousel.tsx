//example API=> https://codesandbox.io/p/sandbox/pp4c69?file=%2Fsrc%2Fjs%2Findex.tsx%3A4%2C11
"use client";
import React, { useState, useCallback, useEffect } from 'react'
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
import { getAllProducts } from '@/lib/product-actions';
import { ProductClient } from '@/types/product';

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
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


  const [products, setProducts] = useState<ProductClient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts().then(data => {
      if ('message' in data) {
    console.error(data.message);
    return; 
  }
      setProducts(data);
      setLoading(false);
    });
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => (
            <div className={styles.embla__slide} key={index}>
              
              <div className={styles.embla__slide__number}>
               {products.map((product) => (
              <div className='product' key={product.id}>                
                  <ProductCard product={product}/>
                
              </div>
            ))}
              </div>
              
            </div>
          ))}
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
