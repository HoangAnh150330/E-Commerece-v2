import { useEffect } from "react";

const PaymentVNPayPage = () => {
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/vnpay/create_payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 9900000, // Số tiền thanh toán (VND)
          orderInfo: "Thanh toán đơn hàng",
        }),
      });

      const data = await response.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl; // Chuyển hướng sang trang thanh toán VNPAY
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
    }
  };

  useEffect(() => {
    handlePayment();
  }, []);

  return <p>Đang chuyển hướng đến VNPAY...</p>;
};

export default PaymentVNPayPage;
