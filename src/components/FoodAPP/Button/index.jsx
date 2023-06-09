import styles from "./styles.module.scss";
const Button = ({ title = "", handleClick = () => {}, customStyle = {} }) => {
  return (
    <>
      <section className={styles.buttonContainer}>
        <button onClick={handleClick} style={customStyle}>
          {title}
        </button>
      </section>
    </>
  );
};
export default Button;
