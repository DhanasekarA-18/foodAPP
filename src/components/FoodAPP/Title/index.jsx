import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import styles from "./styles.module.scss";

const Title = ({ data }) => {
  return (
    <header className={styles.titleContainer}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <Image 
            src="/assets/logo_premium.png" 
            alt="Ds Food Logo" 
            fill
            priority
          />
        </div>
        <h1>DS FOOD</h1>
      </div>
      
      <div className={styles.navActions}>
        <div className={styles.cartIcon}>
          <ShoppingCart size={24} />
        </div>
      </div>
    </header>
  );
};

export default Title;

