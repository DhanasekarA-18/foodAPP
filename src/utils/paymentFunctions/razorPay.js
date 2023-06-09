import logo from "../../../public/assets/logo.png";

export const openRazorpay = (amount, email, phoneNumber, setShow) => {
  const name = email.split("@")[0];
  const options = {
    key: process.env.RAZORPAY_KEY,
    key_secrete: process.env.RAZORPAY_KEY_SECRETE,
    amount: amount * 100,
    name: "DS Food App",
    description: "Payment for selected Food",
    currency: "INR",
    image: logo.src,
    handler: function (response) {
      const { razorpay_payment_id } = response;
      setShow(false);
      window.location.assign(`/thank-you?paymentId=${razorpay_payment_id}`);
    },
    prefill: {
      name: name,
      email: email,
      contact: phoneNumber,
    },
    notes: {
      paidFor: "selected food in Ds App",
    },
    theme: {
      color: "#022b50",
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.open();
};
