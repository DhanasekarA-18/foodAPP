import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Zap } from "lucide-react";
import styles from "./styles.module.scss";

const GiftUnwrap = ({ show, onFinish, savings }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onFinish();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.giftOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Confetti-like particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                rotate: 0
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: [0, 1.5, 0],
                rotate: 360,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                delay: 0.5
              }}
            />
          ))}

          <motion.div
            className={styles.giftBox}
            initial={{ scale: 0, rotate: -20 }}
            animate={{
              scale: [0, 1.2, 1],
              rotate: [0, -10, 10, -5, 5, 0]
            }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <div className={styles.ribbon}></div>
            <div className={styles.boxContent}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className={styles.savingsReveal}
              >
                <div className={styles.iconCircle}>
                  <Zap size={32} fill="currentColor" />
                </div>
                <h3>YOU SAVED</h3>
                <div className={styles.amount}>₹{savings}</div>
                <p>Woohoo! Coupon Applied</p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onFinish}
                  className={styles.continueBtn}
                >
                  Awesome!
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiftUnwrap;
