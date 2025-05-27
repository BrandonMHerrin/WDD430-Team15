import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
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
      </main>
      <footer className={styles.footer}>
        © Handcrafted Haven | 2025 | Team 15
      </footer>
    </div>
  );
}
