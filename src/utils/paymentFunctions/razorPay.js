import logo from "../../../public/assets/logo.png";

export const openRazorpay = (amount, email, phoneNumber, setShow, selectedItems, setIsPageLoading) => {
  const name = email.split("@")[0];
  const options = {
    key: process.env.RAZORPAY_KEY,
    key_secrete: process.env.RAZORPAY_KEY_SECRETE,
    amount: amount * 100,
    name: "DS Food App",
    description: "Payment for selected Food",
    currency: "INR",
    image: logo.src,
    handler: async function (response) {
      const { razorpay_payment_id } = response;
      console.log(response);
      
      // Show Loader
      if (setIsPageLoading) setIsPageLoading(true);

      // Send Bill Email
      try {
        const res = await fetch("/api/send-bill", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            paymentId: razorpay_payment_id,
            selectedItems,
            totalAmount: amount
          }),
        });
        
        const data = await res.json();
        if (!res.ok) {
          console.error("Send-bill API error:", data.error || "Unknown error");
        } else {
          console.log("Bill sent successfully:", data.message);
        }
      } catch (error) {
        console.error("Failed to call send-bill API:", error);
      } finally {
        // Hide Loader
        if (setIsPageLoading) setIsPageLoading(false);
      }

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

  rzp.on("payment.failed", async function (response) {
    console.error("Payment Failed:", response.error);
    if (setIsPageLoading) setIsPageLoading(true);
    try {
      await fetch("/api/send-bill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          paymentId: response.error.metadata.payment_id || "FAILED",
          selectedItems,
          totalAmount: amount,
          status: "failed",
        }),
      });
    } catch (error) {
      console.error("Failed to send failure email:", error);
    } finally {
      if (setIsPageLoading) setIsPageLoading(false);
    }
  });

  rzp.open();
};
