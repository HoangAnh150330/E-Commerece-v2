import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector để lấy thông tin từ Redux store

function PaymentSuccessPage() {
  const navigate = useNavigate();
  const orderDetails = useSelector((state) => state.order.orderDetails); // Lấy thông tin đơn hàng từ Redux store

  return (
    <Card className="p-10">
      <CardHeader className="p-0">
        <CardTitle className="text-4xl">Thanh toán thành công!</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Cảm ơn bạn đã thanh toán. Dưới đây là thông tin đơn hàng của bạn:</p>
        {orderDetails ? (
          <ul>
            <li>Mã đơn hàng: {orderDetails.id}</li>
            <li>Tổng tiền: {orderDetails.totalAmount} VNĐ</li>
            {/* Thêm các thông tin khác nếu cần */}
          </ul>
        ) : (
          <p>Không có thông tin đơn hàng.</p>
        )}
      </CardContent>
      <Button className="mt-5" onClick={() => navigate("/shop/account")}>
        Xem đơn hàng
      </Button>
    </Card>
  );
}

export default PaymentSuccessPage;