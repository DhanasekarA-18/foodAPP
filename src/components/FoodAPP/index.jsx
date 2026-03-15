import styles from "./styles.module.scss";
import Title from "./Title";
import FoodList from "./FoodList";
import LeftFold from "./LeftFold";
import data from "../../data/foodApp/index.json";
const FoodApp = () => {
  return (
    <>
      <main className={styles.foodAppContainer}>
        <div className={styles.leftSidebar}>
          <LeftFold data={data?.leftFoldSection} />
        </div>

        <div className={styles.mainSection}>
          <Title data={data?.titleSection} />
          <FoodList data={data?.foodListSection} />
        </div>
      </main>
    </>
  );
};

export default FoodApp;
