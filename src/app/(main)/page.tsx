// "use client";

import React from "react";
import Navbar from "@/app/(main)/components/navbar";
// import { categoriesData } from "@/data/categories";
import Toolbar from "@/app/(main)/components/toolbar";
import styles from "./page.module.css";
import Image from "next/image";
import EmblaCarousel from "@/components/ui/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from '@/lib/product-actions';


export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Handcrafted Haven, your destination for artisanal products.",
}

export default async function Home() {

  const OPTIONS: EmblaOptionsType = { loop: true, slidesToScroll: "auto" };
  const SLIDE_COUNT = 8;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const products = await getAllProducts();

  if ('message' in products) {
    return (
      <div className="page-layout">
        <div className={styles.page}>
          <main className={styles.main}>
            <div style={{ 
              textAlign: 'center', 
              padding: '2rem',
              background: '#f8f9fa',
              borderRadius: '8px',
              margin: '2rem'
            }}>
              <h2 style={{ color: '#e74c3c' }}>Unable to load products</h2>
              <p>Error: {products.message}</p>
              <p>Please check your database connection and try again.</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="page-layout">
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
              <p className={styles.hero_p}>
                Real Hands. Real Craft. Real You
                <br></br>
                <Link href={"/products"}>
                  <button className={styles.button}>Start Exploring</button>
                </Link>
              </p>
            </div>
          </div>
          <EmblaCarousel slides={SLIDES} options={OPTIONS} products={products} />
        </main>

        <footer className={styles.footer}>
          © Handcrafted Haven | 2025 | Team 15
        </footer>
      </div>
    </div>
  );
}
