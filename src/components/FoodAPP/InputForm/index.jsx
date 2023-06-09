import React from "react";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.scss";
import Button from "../Button";
import { openRazorpay } from "../../../utils/paymentFunctions/razorPay";

const InputForm = ({ payCta, totalAmount, setShow, setShowSelected }) => {
  const initialValues = {
    email: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone number")
      .min(10, "Phone number must be at least 10 characters")
      .max(10, "Phone number can be at most 10 characters")
      .required("Phone number is required"),
  });

  const handleSubmit = (values) => {
    const { email, phoneNumber } = values;
    openRazorpay(totalAmount, email, phoneNumber, setShow);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <section className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.emailContainer}>
              <Field
                type="email"
                id="email"
                name="email"
                placeHolder={`Enter Email`}
                className={`${styles.emailBox} ${
                  errors.email && touched.email && styles.inputError
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div className={styles.mobileContainer}>
              <Field
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                placeHolder={`Enter PhoneNumber`}
                className={`${styles.mobileBox} ${
                  errors.phoneNumber && touched.phoneNumber && styles.inputError
                }`}
                minLength={10}
                maxLength={10}
                pattern="[0-9]{10}"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className={styles.error}
              />
            </div>
            <section className={styles.buttonContainer}>
              <Button title={payCta}></Button>
            </section>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default InputForm;
