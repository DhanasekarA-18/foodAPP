import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();
  
  const handleRoute = () => {
    router.push("/addItem");
  };

  return (
    <div className={styles.homePageContainer}>
      <main className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <Image 
            src="/assets/hero_bg.png" 
            alt="Premium Food Background" 
            fill
            priority
            quality={100}
          />
        </div>

        <div className={styles.heroContent}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.badge}
          >
            Premium Food Delivery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Gourmet Flavors <br /> Delivered to <span>Your Door</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the finest culinary creations made with fresh, locally sourced ingredients. 
            Fast delivery, secure payments, and 100% satisfaction guaranteed.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={styles.ctaGroup}
          >
            <button className={styles.primaryBtn} onClick={handleRoute}>
              Explore Menu <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </main>

      <div className={styles.featuresSection}>
        <FeatureCard 
          icon={<ShoppingBag size={32} className="text-emerald-400" />}
          title="Fresh Ingredients"
          desc="Only the finest, locally sourced organic produce for your meals."
          delay={0.8}
        />
        <FeatureCard 
          icon={<Zap size={32} className="text-emerald-400" />}
          title="Instant Delivery"
          desc="Hot and fresh food delivered to your doorstep in under 30 minutes."
          delay={1.0}
        />
        <FeatureCard 
          icon={<ShieldCheck size={32} className="text-emerald-400" />}
          title="Secure Payments"
          desc="Worry-free transactions powered by Razorpay's trusted architecture."
          delay={1.2}
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="glass-morphism"
    style={{ padding: '32px', borderRadius: '24px' }}
  >
    <div style={{ marginBottom: '20px', color: 'var(--accent-primary)' }}>{icon}</div>
    <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>{desc}</p>
  </motion.div>
);

export default HomePage;

