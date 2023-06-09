import Image from "next/image";
import styles from "./styles.module.scss";
import whiteTick from "../../../../public/assets/whiteTick.svg";

const LeftFold = ({ data }) => {
  return (
    <>
      <section className={styles.leftSectionContainer}>
        <h1>{data?.title}</h1>
        <ul>
          {data?.steps?.map((element, index) => (
            <li key={index}>
              <div>
                <Image
                  src={whiteTick.src}
                  width={16}
                  height={16}
                  alt={element}
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: element }}></div>
            </li>
          ))}
        </ul>
        <footer>
          <i>{data?.footer}</i>
        </footer>
      </section>
    </>
  );
};

export default LeftFold;
