import Image from "next/image";
import { ShoppingCart, Info } from "lucide-react";
import styles from "./styles.module.scss";

const Title = ({ data, handleSelectedItem, handleInfoOpen, totalAmount, cartCount }) => {
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
        <div 
          className={styles.infoIcon} 
          onClick={handleInfoOpen}
        >
          <Info size={24} />
        </div>

        <div 
          className={styles.cartIcon} 
          onClick={handleSelectedItem}
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Title;

