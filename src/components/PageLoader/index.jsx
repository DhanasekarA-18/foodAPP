import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.scss";

const PageLoader = ({ isLoading, message = "Processing your order..." }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className={styles.loaderOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={styles.loaderContent}>
            <div className={styles.spinner}>
              <div className={styles.doubleBounce1}></div>
              <div className={styles.doubleBounce2}></div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {message}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
