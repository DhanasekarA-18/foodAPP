import React from "react";
import styles from "./styles.module.scss";
import { ChevronLeft, CreditCard } from "lucide-react";

const SelectedItems = ({
  currentlySelected,
  totalAmount,
  setShowSelected,
  setShow,
}) => {
  const handleBack = () => {
    setShowSelected(false);
  };

  const handleNext = () => {
    setShow(true);
    setShowSelected(false);
  };

  return (
    <div className={styles.selectedItemList}>
      <div className={styles.itemList}>
        {Object.values(currentlySelected).map((item, index) => (
          <div key={index} className={styles.itemRow}>
            <div className={styles.itemInfo}>
              <div className={styles.itemName}>{item?.name}</div>
              <div className={styles.itemMeta}>
                {item?.selectedCount} x ₹{item?.cost}
              </div>
            </div>
            <div className={styles.itemPrice}>
              ₹{item?.cost * item?.selectedCount}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.totalSection}>
        <span>Total Payable</span>
        <div className={styles.totalAmount}>₹{totalAmount}</div>
      </div>

      <div className={styles.buttonContainer}>
        <button 
          className="btn-premium" 
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}
          onClick={handleBack}
        >
          <ChevronLeft size={18} /> Edit
        </button>
        <button className="btn-premium btn-primary" onClick={handleNext}>
          Checkout <CreditCard size={18} />
        </button>
      </div>
    </div>
  );
};

export default SelectedItems;

