import styles from "./styles.module.scss";
import { useRouter } from "next/router";
const HomePage = () => {
  const router = useRouter();
  const handleRoute = () => {
    router.push("/addItem");
  };
  return (
    <>
      <div className={styles.homePageContainer}>
        <header>
          <h1>Welcome to Ds Food App</h1>
        </header>
        <main className={styles.mainSection}>
          <section className={styles.startButtonContainer}>
            <button className={styles.startButton} onClick={handleRoute}>
              Click to Start
            </button>
          </section>
        </main>
      </div>
    </>
  );
};
export default HomePage;
