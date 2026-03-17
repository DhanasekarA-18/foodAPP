import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Loader2,
  Home,
  MapPin,
  Clock,
  ChevronRight,
  Phone,
  Info,
  Calendar,
  CreditCard,
  Star,
  CheckCircle2,
  Mail
} from "lucide-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import styles from "./styles.module.scss";

const ThankYou = () => {
  const router = useRouter();
  const [paymentId, setPaymentId] = useState(null);
  const [orderDate, setOrderDate] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("123 Food Street, GOURMET City");

  useEffect(() => {
    const { paymentId } = router?.query;
    if (paymentId) {
      setPaymentId(paymentId);
      setOrderDate(new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }));

      // Read cart before clearing
      const savedCart = Cookies.get("ds_food_cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          const items = Object.values(parsedCart);
          setOrderItems(items);
          const total = items.reduce((acc, item) => acc + item.totalCost, 0);
          setOrderTotal(total);
        } catch (e) {
          console.error("Error reading cart for summary", e);
        }
      }

      // Read delivery address from cookie
      const savedAddress = Cookies.get("ds_delivery_address");
      if (savedAddress) {
        setDeliveryAddress(savedAddress);
      }

      Cookies.remove("ds_food_cart");

      // Artificial delay for premium feel
      const timer = setTimeout(() => setIsLoaded(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [router?.query]);

  const handleSupportClick = () => {
    toast.success("Our agent will call you soon!", {
      icon: '📞',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const handleRatingClick = () => {
    toast("Rating System Coming Soon!", {
      icon: '🚀',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const trackingSteps = [
    { id: 1, title: "Order Confirmed", desc: "Your order has been received", time: "Just now", status: "completed" },
    { id: 2, title: "Preparing Food", desc: "Chef is starting to cook", time: "Expected in 10 mins", status: "active" },
    { id: 3, title: "Out for Delivery", desc: "Agent is picking up", time: "ETA 25 mins", status: "pending" },
    { id: 4, title: "Arrived", desc: "Enjoy your meal!", time: "ETA 30 mins", status: "pending" },
  ];

  if (!paymentId || !isLoaded) {
    return (
      <section className={styles.loaderSection}>
        <div className={styles.loaderContent}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className={styles.spinner}
          >
            <Loader2 size={48} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Finalizing your gourmet experience...
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <main className={styles.thankyouContainer}>
      <div className={styles.mainWrapper}>
        {/* Header Success Section */}
        <section className={styles.headerSection}>
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 200 }}
            className={styles.successBadge}
          >
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.titleArea}
          >
            <h1>Order Placed!</h1>
            <p>Your culinary journey has begun. Track it below.</p>
          </motion.div>
        </section>

        <div className={styles.contentGrid}>
          {/* Left Column: Tracking & Summary */}
          <div className={styles.leftCol}>
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={styles.statusSection}
            >
              <div className={styles.cardHeader}>
                <Clock size={20} className={styles.icon} />
                <h3>Live Tracking</h3>
                <span className={styles.eta}>30 mins ETA</span>
              </div>

              <div className={styles.timeline}>
                {trackingSteps.map((step, idx) => (
                  <div key={idx} className={`${styles.timelineItem} ${styles[step.status]}`}>
                    <div className={styles.timelineNode}>
                      {step.status === "completed" ? <Check size={14} /> : idx + 1}
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.stepTitle}>
                        {step.title}
                        <span className={styles.stepTime}>{step.time}</span>
                      </div>
                      <p>{step.desc}</p>
                    </div>
                    {idx !== trackingSteps.length - 1 && <div className={styles.timelineLine} />}
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Email Confirmation Banner */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className={styles.emailBanner}
            >
              <div className={styles.bannerContent}>
                <div className={styles.mailIcon}>
                  <Mail size={24} />
                </div>
                <div className={styles.bannerText}>
                  <h4>Order Details Sent!</h4>
                  <p>A detailed receipt and order summary have been sent to your registered email address.</p>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right Column: Info & Actions */}
          <div className={styles.rightCol}>
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className={styles.infoCard}
            >
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><Calendar size={18} /></div>
                <div className={styles.infoDetail}>
                  <span>Placed On</span>
                  <p>{orderDate}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><CreditCard size={18} /></div>
                <div className={styles.infoDetail}>
                  <span>Reference ID</span>
                  <p className={styles.id}>{paymentId}</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoIcon}><MapPin size={18} /></div>
                <div className={styles.infoDetail}>
                  <span>Delivering To</span>
                  <div className={styles.addressField}>
                    {deliveryAddress}
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={styles.actionCard}
            >
              <div className={styles.promoText} onClick={handleRatingClick}>
                <Star size={18} className={styles.star} />
                <span>Rate your dining experience</span>
                <ChevronRight size={18} />
              </div>
              <div className={styles.btnGroup}>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => router.push("/")}
                >
                  <Home size={18} />
                  Back to Menu
                </button>
                <button
                  className={styles.primaryBtn}
                  onClick={handleSupportClick}
                >
                  <Phone size={18} />
                  Help & Support
                </button>
              </div>
            </motion.section>

            <div className={styles.supportInfo}>
              <Info size={14} />
              <p>For any changes, please call the restaurant within 2 minutes of placing your order.</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className={styles.footerInfo}
        >
          <span>Recieved with ❤️ by DS FoodAPP Special Treats</span>
        </motion.div>
      </div>
    </main>
  );
};

export default ThankYou;
