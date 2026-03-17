import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import styles from "./styles.module.scss";
import Title from "./Title";
import FoodList from "./FoodList";
import LeftFold from "./LeftFold";
import PopUp from "../PopUp";
import data from "../../data/foodApp/index.json";

const CART_COOKIE_NAME = "ds_food_cart";
const COUPON_CODE = "GOURMET5";
const DISCOUNT_PERCENT = 5;

const FoodApp = () => {
  const [selectedItem, setSelectedItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSelected, setShowSelected] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);

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

  // Calculate Subtotal
  const subtotal = useMemo(() => {
    let total = 0;
    Object.values(selectedItem).forEach((item) => {
      total += item.totalCost;
    });
    return total;
  }, [selectedItem]);

  // Calculate Discount and Total
  const discountAmount = useMemo(() => {
    if (isCouponApplied && subtotal > 0) {
      return (subtotal * DISCOUNT_PERCENT) / 100;
    }
    return 0;
  }, [isCouponApplied, subtotal]);

  const totalAmount = subtotal - discountAmount;

  const handleSelectedItem = () => {
    setShowSelected(true);
  };

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

  return (
    <>
      <main className={styles.foodAppContainer}>
        <div className={styles.leftSidebar}>
          <LeftFold data={data?.leftFoldSection} />
        </div>

        <div className={styles.mainSection}>
          <Title 
            data={data?.titleSection} 
            handleSelectedItem={handleSelectedItem}
            handleInfoOpen={() => setShowInfo(true)}
            totalAmount={totalAmount}
            cartCount={Object.keys(selectedItem).length}
          />
          <FoodList 
            data={data?.foodListSection} 
            selectedItem={selectedItem}
            subtotal={subtotal}
            discountAmount={discountAmount}
            totalAmount={totalAmount}
            isLoaded={isLoaded}
            handleItem={handleItem}
            showSelected={showSelected}
            setShowSelected={setShowSelected}
            handleSelectedItem={handleSelectedItem}
            isCouponApplied={isCouponApplied}
            setIsCouponApplied={setIsCouponApplied}
            couponCode={COUPON_CODE}
            discountPercent={DISCOUNT_PERCENT}
          />
        </div>
      </main>

      <PopUp 
        show={showInfo} 
        setShow={setShowInfo} 
        title="Ordering Guide"
      >
        <div style={{ padding: '10px 0' }}>
          <LeftFold data={data?.leftFoldSection} />
        </div>
      </PopUp>
    </>
  );
};

export default FoodApp;
