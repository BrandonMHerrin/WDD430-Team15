'use client';

import React from 'react';
import Navbar from '../components/navbar';
import { categoriesData } from '../data/categories';
import Toolbar from '../components/toolbar';
import styles from "./page.module.css";

export default function Home() {

  const categories = categoriesData.filter(category => category.isActive);

  const handleCategorySelect = (categoryId: string) => {
    console.log('Selected category:', categoryId);
    // Still missing, add later on here: filtering logic
  };

  return (
    <div className="page-layout">
      
      <Navbar 
        cartItemCount={3} 
        isLoggedIn={false} 
        userName="John"
        categories={categories}
        onCategorySelect={handleCategorySelect}
      />

       <Toolbar 
        categories={categories}
        onCategorySelect={handleCategorySelect}
        isMobile={false}
        
      />


      <main className={styles.main}>
        
      </main>



      <footer className={styles.footer}>
       
      </footer>
    </div>
  );
}
