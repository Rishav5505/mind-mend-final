import React from "react";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const handleRazorpay = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag", // Dummy Razorpay test key
      amount: 50000, // amount in paise (₹500)
      currency: "INR",
      name: "MindMend",
      description: "Therapy Session Payment",
      image: "https://razorpay.com/favicon.png",
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#6366f1",
      },
      method: {
        netbanking: true,
        card: true,
        upi: true,
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Book & Pay for Session</h2>
        <p className="mb-4 text-gray-700 text-center">Pay securely using UPI, Card, or Net Banking:</p>
        <button
          className="w-full py-3 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
          onClick={handleRazorpay}
        >
          Pay ₹500
        </button>
        <p className="mt-6 text-xs text-gray-400 text-center">(Razorpay test mode enabled)</p>
      </div>
    </div>
  );
};

export default Payment;
