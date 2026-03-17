import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ChevronRight } from "lucide-react";

import PopUp from "../../PopUp";
import InputForm from "../InputForm";
import SelectedItems from "../SelectedItems";

import styles from "./styles.module.scss";
import PageLoader from "../../PageLoader";

const FoodList = ({ 
  data, 
  selectedItem, 
  subtotal,
  discountAmount,
  totalAmount, 
  isLoaded, 
  handleItem, 
  showSelected, 
  setShowSelected, 
  handleSelectedItem,
  isCouponApplied,
  setIsCouponApplied,
  couponCode,
  discountPercent
}) => {
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [show, setShow] = useState(false); // form modal

  const getFoodImage = (name) => {
    const formattedName = name.toLowerCase();
    try {
      if (formattedName) {
        return `/assets/food_${formattedName}.png`;
      }
    } catch {
      // Fallback image for chapati/poori
      return `/assets/hero_bg.png`;
    }
  };

  return (
    <main className={styles.foodListContainer}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Select Your Gourmet Meal</h2>
        <div className={styles.subtitle}>Handcrafted breakfast delicacies prepared fresh for you</div>
      </div>

      <motion.section
        className={styles.gridSection}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {data?.foodItems.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            className={`${styles.foodCard} ${selectedItem[item?.code] ? styles.selected : ""}`}
          >
            <div className={styles.imageContainer}>
              <Image
                src={getFoodImage(item?.name)}
                alt={item?.name}
                fill
                className={styles.foodImage}
              />
              <div className={styles.priceTag}>₹{item?.cost}</div>
            </div>

            <div className={styles.content}>
              <div className={styles.cardHeader}>
                <h3>{item?.name}</h3>
                <div className={styles.vegIndicator}>
                  <div className={styles.dot}></div>
                </div>
              </div>

              <div className={styles.actions}>
                <div className={styles.quantityControl}>
                  <button
                    onClick={() => handleItem(item, "sub")}
                    disabled={!selectedItem[item?.code]}
                  >
                    <Minus size={18} />
                  </button>
                  <span>{selectedItem[item?.code]?.selectedCount || 0}</span>
                  <button onClick={() => handleItem(item, "add")}>
                    <Plus size={18} />
                  </button>
                </div>

                <AnimatePresence>
                  {selectedItem[item?.code] && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      style={{ fontWeight: '700', color: 'var(--accent-primary)' }}
                    >
                      ₹{selectedItem[item?.code]?.totalCost}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {isLoaded && totalAmount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={styles.stickyBar}
        >
          <div className={styles.barContent}>
            <div className={styles.priceInfo}>
              <div className={styles.totalLabel}>Total Payable</div>
              <div className={styles.totalAmount}>
                ₹{totalAmount}
                {isCouponApplied && (
                  <span className={styles.savingsBadge}>
                    Saved ₹{discountAmount}
                  </span>
                )}
              </div>
            </div>

            <button
              className="btn-premium btn-primary reviewBtn"
              onClick={handleSelectedItem}
            >
              Review Order <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      )}

      <PopUp
        show={showSelected}
        setShow={setShowSelected}
        title={`Review Order`}
      >
        <SelectedItems
          currentlySelected={selectedItem}
          subtotal={subtotal}
          discountAmount={discountAmount}
          totalAmount={totalAmount}
          setShowSelected={setShowSelected}
          setShow={setShow}
          handleItem={handleItem}
          isCouponApplied={isCouponApplied}
          setIsCouponApplied={setIsCouponApplied}
          couponCode={couponCode}
          discountPercent={discountPercent}
        />
      </PopUp>

      <PopUp show={show} setShow={setShow} title={`Delivery Details`}>
        <InputForm
          payCta={`Complete Payment (₹${totalAmount})`}
          totalAmount={totalAmount}
          subtotal={subtotal}
          discountAmount={discountAmount}
          isCouponApplied={isCouponApplied}
          setShow={setShow}
          setShowSelected={setShowSelected}
          currentlySelected={selectedItem}
          setIsPageLoading={setIsPageLoading}
        />
      </PopUp>

      <PageLoader isLoading={isPageLoading} />
    </main>
  );
};

export default FoodList;
