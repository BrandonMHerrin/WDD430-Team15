import Image from "next/image";
import styles from "./page.module.css";
import React from 'react'
import EmblaCarousel from './ui/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'

export default function Home() {

  //On Sale Carousel
  const OPTIONS: EmblaOptionsType = { loop: true, slidesToScroll: 'auto' }
  const SLIDE_COUNT = 8
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        
          <Image
            className={styles.banner_mobile} 
            src="/hero-mobile.jpg"
            alt="banner"
            width={600}
            height={400}
            priority
        
          />
          <div className={styles.desktop_banner}>
            <Image
              className={styles.banner} 
              src="/hero-desktop.jpg"
              alt="banner"
              width={1920}
              height={1040}
              priority
              
            />

            <div className={styles.hero_p_div}>
              <p className={styles.hero_p}>Real Hands. Real Craft. Real You
                <br></br>
                <button className={styles.button}>
                Start Exploring
              </button>
              </p>
            </div>
          </div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />          
      </main>
      <footer className={styles.footer}>
        © Handcrafted Haven | 2025 | Team 15
      </footer>
    </div>
  );
}
