import React, { useState } from "react";
import { ChevronLeft, CreditCard, Plus, Minus, ShoppingBag, Tag, X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import GiftUnwrap from "../GiftUnwrap";
import styles from "./styles.module.scss";

const SelectedItems = ({
  currentlySelected,
  subtotal,
  discountAmount,
  totalAmount,
  setShowSelected,
  setShow,
  handleItem,
  isCouponApplied,
  setIsCouponApplied,
  couponCode,
  discountPercent
}) => {
  const [showUnwrap, setShowUnwrap] = React.useState(false);

  const handleBack = () => {
    setShowSelected(false);
  };

  const handleNext = () => {
    setShow(true);
    setShowSelected(false);
  };

  const handleApplyCoupon = () => {
    setIsCouponApplied(true);
    setShowUnwrap(true);
    // Move toast to wrap end or keep it here
  };

  const cartItems = Object.entries(currentlySelected);

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <ShoppingBag size={56} strokeWidth={1.5} />
        </div>
        <div className={styles.emptyContent}>
          <h3>Your cart feels light</h3>
          <p>Go back and add some gourmet treats to your bag!</p>
          <button className="btn-premium btn-primary" onClick={handleBack}>
            Keep Exploring
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <GiftUnwrap 
        show={showUnwrap} 
        savings={discountAmount.toFixed(2)} 
        onFinish={() => setShowUnwrap(false)} 
      />
      {/* Scrollable List */}
      <div className={styles.scrollArea}>
        <div className={styles.itemList}>
          {cartItems.map(([code, item], index) => (
            <div key={index} className={styles.itemRow}>
              <div className={styles.itemMain}>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item?.name}</div>
                  <div className={styles.itemPricePerUnit}>
                    ₹{item?.cost} per unit
                  </div>
                </div>
                
                <div className={styles.quantitySection}>
                  <div className={styles.quantityControl}>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => handleItem({ ...item, code }, "sub")}
                    >
                      <Minus size={14} />
                    </button>
                    <span className={styles.qtyText}>{item?.selectedCount}</span>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => handleItem({ ...item, code }, "add")}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className={styles.totalItemPrice}>
                    ₹{item?.totalCost}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon Section */}
        <div className={styles.couponSection}>
          {!isCouponApplied ? (
            <div className={styles.availableOffer}>
              <div className={styles.offerMain}>
                <div className={styles.iconWrapper}>
                  <Tag size={18} className={styles.tagIcon} />
                </div>
                <div className={styles.offerDetails}>
                  <div className={styles.codeRow}>
                    <span className={styles.code}>{couponCode}</span>
                    <span className={styles.badge}>BEST OFFER</span>
                  </div>
                  <p className={styles.description}>Save 5% on your gourmet breakfast items</p>
                </div>
              </div>
              <button 
                className={styles.inlineApplyBtn}
                onClick={handleApplyCoupon}
              >
                APPLY
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={styles.appliedCoupon}
            >
              <div className={styles.couponInfo}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <div>
                  <div className={styles.code}>{couponCode} applied</div>
                  <div className={styles.savings}>You saved ₹{discountAmount.toFixed(2)}</div>
                </div>
              </div>
              <button 
                className={styles.removeBtn}
                onClick={() => setIsCouponApplied(false)}
              >
                REMOVE
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sticky Footer */}
      <div className={styles.footer}>
        <div className={styles.billDetails}>
          <div className={styles.billRow}>
            <span>Item Total</span>
            <span>₹{subtotal}</span>
          </div>
          <AnimatePresence>
            {isCouponApplied && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`${styles.billRow} ${styles.discount}`}
              >
                <span>Coupon Discount ({discountPercent}%)</span>
                <span>-₹{discountAmount}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className={`${styles.billRow} ${styles.grandTotal}`}>
            <span>To Pay</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className="btn-premium btn-primary" onClick={handleNext}>
            Proceed to Checkout <CreditCard size={18} />
          </button>
          <button 
            className="btn-premium btn-secondary" 
            onClick={handleBack}
          >
            <ChevronLeft size={18} /> Add More Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectedItems;
