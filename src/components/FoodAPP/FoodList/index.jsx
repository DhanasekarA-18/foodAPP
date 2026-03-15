import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, CreditCard, ChevronRight } from "lucide-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import Button from "../Button";
import PopUp from "../../PopUp";
import InputForm from "../InputForm";
import SelectedItems from "../SelectedItems";


import styles from "./styles.module.scss";
import PageLoader from "../../PageLoader";

const CART_COOKIE_NAME = "ds_food_cart";

const FoodList = ({ data }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Initialize from cookie on mount
  useEffect(() => {
    const savedCart = Cookies.get(CART_COOKIE_NAME);
    if (savedCart) {
      try {
        setSelectedItem(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart cookie");
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to cookie whenever selectedItem changes
  useEffect(() => {
    if (isLoaded) {
      Cookies.set(CART_COOKIE_NAME, JSON.stringify(selectedItem), { expires: 7 });
    }
  }, [selectedItem, isLoaded]);

  const [show, setShow] = useState(false); // form modal
  const [showSelected, setShowSelected] = useState(false); // selectedItem modal

  const handleItem = (item, type) => {
    const { name, cost, code } = item;
    const currentItem = { ...selectedItem };
    const getCount = currentItem[code]?.selectedCount || 0;

    if (type === "add") {
      currentItem[code] = {
        name,
        selectedCount: getCount + 1,
        cost,
        totalCost: (getCount + 1) * cost,
      };
    } else if (type === "sub") {
      const isSelected = currentItem[code];
      if (isSelected) {
        if (getCount === 1) {
          delete currentItem[code];
        } else {
          currentItem[code] = {
            name,
            selectedCount: getCount - 1,
            cost,
            totalCost: (getCount - 1) * cost,
          };
        }
      }
    }
    setSelectedItem(currentItem);
  };

  useEffect(() => {
    if (selectedItem) {
      let total = 0;
      Object.values(selectedItem).forEach((item) => {
        total += item.totalCost;
      });
      setTotalAmount(total);
    }
  }, [selectedItem]);

  const handleSelectedItem = () => {
    if (totalAmount === 0) {
      toast.error("Your cart is empty! Please add some delicious items.", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } else {
      setShowSelected(true);
    }
  };

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
      <h2 className={styles.title}>Delectable Menu</h2>

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
            className={styles.foodCard}
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
              <div className={styles.code}>ID: {item?.code}</div>
              <h3>{item?.name}</h3>

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
          style={{
            position: 'fixed',
            bottom: '30px',
            paddingRight: '40px',
            width: 'calc(100% - 280px)',
            left: '280px',
            zIndex: 150,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div className="glass-morphism" style={{
            padding: '20px 40px',
            borderRadius: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            width: '100%',
            maxWidth: '1100px',
            border: '1px solid rgba(16, 185, 129, 0.3)'
          }}>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>Subtotal</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--accent-primary)' }}>₹{totalAmount}</div>
            </div>

            <button
              className="btn-premium btn-primary"
              onClick={handleSelectedItem}
              style={{ padding: '18px 45px', fontSize: '18px' }}
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
          totalAmount={totalAmount}
          setShowSelected={setShowSelected}
          setShow={setShow}
        />
      </PopUp>

      <PopUp show={show} setShow={setShow} title={`Delivery Details`}>
        <InputForm
          payCta={`Complete Payment (₹${totalAmount})`}
          totalAmount={totalAmount}
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

