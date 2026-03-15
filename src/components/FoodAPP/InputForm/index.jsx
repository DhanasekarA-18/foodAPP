import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, Lock, AlertCircle } from "lucide-react";
import styles from "./styles.module.scss";
import { openRazorpay } from "../../../utils/paymentFunctions/razorPay";

// Define validation schema with Zod
const schema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string()
    .min(1, { message: "Phone number is required" })
    .regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit Indian mobile number" }),
});

const InputForm = ({ payCta, totalAmount, setShow, setShowSelected, currentlySelected, setIsPageLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur", // Validate when user leaves the field
  });

  const onSubmit = (data) => {
    const { email, phoneNumber } = data;
    openRazorpay(totalAmount, email, phoneNumber, setShow, currentlySelected, setIsPageLoading);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email Address</label>
          <div style={{ position: 'relative' }}>
            <input
              {...register("email")}
              type="email"
              id="email"
              placeholder="name@example.com"
              className={`${errors.email ? styles.inputError : ""}`}
            />
            {errors.email && (
              <div className={styles.error}>
                <AlertCircle size={14} /> {errors.email.message}
              </div>
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <div style={{ position: 'relative' }}>
            <input
              {...register("phoneNumber")}
              type="text"
              id="phoneNumber"
              placeholder="10-digit mobile number"
              className={`${errors.phoneNumber ? styles.inputError : ""}`}
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
              }}
              maxLength={10}
            />
            {errors.phoneNumber && (
              <div className={styles.error}>
                <AlertCircle size={14} /> {errors.phoneNumber.message}
              </div>
            )}
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--text-muted)',
          fontSize: '13px',
          marginTop: '10px',
          padding: '12px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '12px',
          border: '1px solid var(--glass-border)'
        }}>
          <Lock size={14} className="text-emerald-500" />
          <span>Secure SSL Encrypted Payment</span>
        </div>

        <section className={styles.buttonContainer}>
          <button type="submit" className="btn-premium btn-primary">
            {payCta}
          </button>
        </section>
      </form>
    </section>
  );
};

export default InputForm;


