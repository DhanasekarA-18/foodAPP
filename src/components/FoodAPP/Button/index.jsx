import styles from "./styles.module.scss";

const Button = ({ title = "", handleClick = () => {}, customStyle = {}, type = "primary" }) => {
  return (
    <div className={styles.buttonContainer}>
      <button 
        onClick={handleClick} 
        style={customStyle}
        className={type === "primary" ? "btn-premium btn-primary" : "btn-premium"}
      >
        {title}
      </button>
    </div>
  );
};
export default Button;
