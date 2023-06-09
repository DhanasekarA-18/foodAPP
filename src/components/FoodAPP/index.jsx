import styles from "./styles.module.scss";
import Title from "./Title";
import FoodList from "./FoodList";
import LeftFold from "./LeftFold";
import data from "../../data/foodApp/index.json";
const FoodApp = () => {
  return (
    <>
      <main className={styles.foodAppContainer}>
        <section className={styles.leftFold}>
          <LeftFold data={data?.leftFoldSection} />
        </section>
        <section className={styles.rightFold}>
          <Title data={data?.titleSection} />
          <FoodList data={data?.foodListSection} />
        </section>
      </main>
    </>
  );
};

export default FoodApp;
