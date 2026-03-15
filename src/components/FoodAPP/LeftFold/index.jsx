import styles from "./styles.module.scss";

const LeftFold = ({ data }) => {
  return (
    <div className={styles.leftFoldContainer}>
      <div className={styles.timelineWrapper}>
        {data?.steps?.map((element, index) => (
          <div key={index} className={styles.stepItem}>
            <div className={styles.stepNumber}>{index + 1}</div>
            <div 
              className={styles.stepText} 
              dangerouslySetInnerHTML={{ __html: element }} 
            />
          </div>
        ))}
      </div>
      <footer className={styles.footer}>
        {data?.footer}
      </footer>
    </div>
  );
};

export default LeftFold;

