import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Home } from "lucide-react";
import Cookies from "js-cookie";
import styles from "./styles.module.scss";

const ThankYou = () => {
  const router = useRouter();
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    const { paymentId } = router?.query;
    if (paymentId) {
      setPaymentId(paymentId);
      Cookies.remove("ds_food_cart");
    }
  }, [router?.query]);

  if (!paymentId) {
    return (
      <section className={styles.loaderSection}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 size={48} color="var(--accent-primary)" />
        </motion.div>
      </section>
    );
  }

  return (
    <main className={styles.thankyouContainer}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className={styles.successCircle}
      >
        <Check size={48} strokeWidth={3} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Order Confirmed!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Your meal is being prepared with care and will be delivered to your doorstep shortly.
        We&apos;ve dropped a confirmation email with all the details of your order.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={styles.orderCard}
      >
        <div className={styles.label}>Transaction ID</div>
        <div className={styles.id}>{paymentId}</div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className={styles.homeBtn}
        onClick={() => router.push("/")}
      >
        <Home size={20} style={{ marginRight: '10px', display: 'inline' }} /> 
        Back to Home
      </motion.button>
    </main>
  );
};

export default ThankYou;

