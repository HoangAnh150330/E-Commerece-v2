// PaymentVNPayReturnPage.jsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { capturePaymentVNPay } from "../../store/shop/order-slice/index"; // Đảm bảo đường dẫn đúng

function PaymentVNPayReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const vnp_ResponseCode = params.get("vnp_ResponseCode");
  const orderId = params.get("orderId"); // Giả sử bạn đã gửi orderId trong yêu cầu thanh toán

  useEffect(() => {
    if (vnp_ResponseCode && orderId) {
      dispatch(capturePaymentVNPay({ vnp_ResponseCode, orderId })).then((data) => {
        if (data?.payload?.success) {
          window.location.href = "/shop/payment-success"; // Chuyển hướng đến trang thành công
        } else {
          // Xử lý lỗi nếu thanh toán không thành công
        }
      });
    }
  }, [vnp_ResponseCode, orderId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đang xử lý thanh toán...Vui lòng chờ!</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default PaymentVNPayReturnPage;