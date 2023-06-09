import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

import successTick from "../../../public/assets/successTick.gif";
import styles from "./styles.module.scss";

const ThankYou = () => {
  const router = useRouter();
  const [paymentId, setPaymentId] = useState(null);

  useEffect(() => {
    const { paymentId } = router?.query;
    if (paymentId) {
      setPaymentId(paymentId);
    }
  }, [router?.query]);

  const data = {
    title: "Thank You for your Purchase",
    description: "Your Payment Transaction Id ",
  };

  return (
    <>
      {paymentId ? (
        <main className={styles.thankyouContainer}>
          <section>
            <Image
              src={successTick.src}
              width={100}
              height={100}
              alt={`payment-success`}
            />
          </section>
          <section>
            <h1>{data["title"]}</h1>
          </section>
          <section>
            <h2>
              {data["description"]} - <strong>{paymentId}</strong>
            </h2>
          </section>
        </main>
      ) : (
        <section className={styles.loaderSection}>
          {" "}
          <Spinner
            animation="border"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          />
        </section>
      )}
    </>
  );
};

export default ThankYou;
