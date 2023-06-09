import React, { useEffect, useState } from "react";
import Image from "next/image";

import Button from "../Button";
import PopUp from "../../PopUp";
import InputForm from "../InputForm";
import SelectedItems from "../SelectedItems";

import plus from "../../../../public/assets/plus.svg";
import minus from "../../../../public/assets/minus.svg";

import styles from "./styles.module.scss";

const FoodList = ({ data }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
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

  const getIcon = (src, name) => (
    <Image src={src} width={16} height={16} alt={name} />
  );

  const getPattern = (code) =>
    selectedItem[code]
      ? `${selectedItem[code]?.selectedCount} * ${selectedItem[code]?.cost} = ${selectedItem[code]?.totalCost}`
      : 0;

  const handleSelectedItem = () => {
    if (totalAmount === 0) {
      alert("Please Add an Item!");
    } else {
      setShowSelected(true);
    }
  };

  return (
    <main className={styles.foodListContainer}>
      <section className={styles.listSection}>
        <table>
          <thead>
            <tr>
              {data?.foodItemHeadings?.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.foodItems.map((item, index) => (
              <tr key={index}>
                <td>{item?.code}</td>
                <td>{item?.name}</td>
                <td>{item?.cost}</td>
                <td className={styles.iconContainer}>
                  <span
                    onClick={() => handleItem(item, "add")}
                    className={styles.selectPointer}
                  >
                    {getIcon(plus.src, "plus")}
                  </span>
                  <span
                    onClick={() => handleItem(item, "sub")}
                    className={
                      !selectedItem[item?.code]
                        ? styles.notPointer
                        : styles.selectPointer
                    }
                  >
                    {getIcon(minus.src, "minus")}
                  </span>
                </td>
                <td>{getPattern(item?.code)}</td>
              </tr>
            ))}
            <tr className={styles.totalAmount}>
              <td colSpan={data?.foodItemHeadings?.length - 1}></td>
              <td>{`${data?.totalAmount} = ${totalAmount ?? 0}`}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <Button title={`Proceed to Pay`} handleClick={handleSelectedItem} />
      </section>
      <section>
        <PopUp
          show={showSelected}
          setShow={setShowSelected}
          title={`Pre-Checkout`}
          children={
            <SelectedItems
              currentlySelected={selectedItem}
              totalAmount={totalAmount}
              setShowSelected={setShowSelected}
              setShow={setShow}
            />
          }
        />

        <PopUp
          show={show}
          setShow={setShow}
          title={`Fill the Details`}
          children={
            <InputForm
              payCta={`Pay ₹${totalAmount}`}
              totalAmount={totalAmount}
              setShow={setShow}
              setShowSelected={setShowSelected}
            />
          }
        />
      </section>
    </main>
  );
};

export default FoodList;
