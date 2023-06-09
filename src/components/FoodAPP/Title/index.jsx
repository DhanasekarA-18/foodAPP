import styles from "./styles.module.scss";
const Title = ({ data }) => {
  return (
    <div>
      <h1>{data?.title}</h1>
    </div>
  );
};
export default Title;
