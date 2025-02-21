const querystring = require("qs");
const crypto = require("crypto");
const moment = require("moment");
require("dotenv").config();

const createVNPayPayment = async (req, res) => {
  try {
    const { amount, orderInfo, orderId } = req.body;

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    const vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;

    const createDate = moment().format("YYYYMMDDHHmmss");
    const orderInfoEncoded = encodeURIComponent(orderInfo);

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Amount: amount * 100, // Nhân 100 vì VNPay dùng đơn vị VND x100
      vnp_CreateDate: createDate,
      vnp_CurrCode: "VND",
      vnp_IpAddr: req.ip,
      vnp_Locale: "vn",
      vnp_OrderInfo: orderInfoEncoded,
      vnp_OrderType: "other",
      vnp_ReturnUrl: returnUrl,
      vnp_TxnRef: orderId, // ID đơn hàng
    };

    // Sắp xếp key theo thứ tự alphabet
    vnp_Params = sortObject(vnp_Params);

    // Tạo chuỗi query
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    vnp_Params["vnp_SecureHash"] = signed;
    const paymentUrl = `${vnpUrl}?${querystring.stringify(vnp_Params, { encode: false })}`;

    res.json({ success: true, paymentUrl });
  } catch (error) {
    console.error("Lỗi khi tạo thanh toán:", error);
    res.status(500).json({ success: false, message: "Lỗi khi tạo thanh toán" });
  }
};

// Xử lý kết quả thanh toán từ VNPay
const vnpayReturn = (req, res) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);
  const secretKey = process.env.VNP_HASH_SECRET;

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    if (vnp_Params["vnp_ResponseCode"] === "00") {
      return res.redirect(`http://localhost:3000/shop/payment-success?orderId=${vnp_Params["vnp_TxnRef"]}`);
    } else {
      return res.redirect(`http://localhost:3000/shop/payment-failed`);
    }
  } else {
    return res.status(400).json({ success: false, message: "Chữ ký không hợp lệ" });
  }
};

// Hàm sắp xếp object theo thứ tự key alphabet
function sortObject(obj) {
  let sorted = {};
  let keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

module.exports = { createVNPayPayment, vnpayReturn };
