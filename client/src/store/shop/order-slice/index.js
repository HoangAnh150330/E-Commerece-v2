import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
  paymentUrl: null, // Thêm trường này để lưu URL thanh toán VNPay
  paymentSuccess: false, // Thêm trường này để lưu trạng thái thanh toán
};

// Action để tạo đơn hàng mới
export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:5000/api/shop/order/create",
      orderData
    );

    return response.data;
  }
);

// Action để tạo thanh toán VNPay
export const createPaymentVNPay = createAsyncThunk(
  "order/createPaymentVNPay",
  async (orderId) => {
    const response = await axios.post(
      "http://localhost:5000/api/vnpay/create_payment",
      { orderId }
    );
    return response.data; // Giả sử response.data chứa URL thanh toán
  }
);

// Action để xử lý kết quả thanh toán VNPay
export const capturePaymentVNPay = createAsyncThunk(
  "order/capturePaymentVNPay",
  async ({ vnp_ResponseCode, orderId }) => {
    const response = await axios.post(
      "http://localhost:5000/api/vnpay/capture_payment",
      { vnp_ResponseCode, orderId }
    );
    return response.data; // Giả sử response.data chứa thông tin về việc thanh toán thành công hay không
  }
);

// Các action khác...
export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUser Id",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/order/list/${userId}`
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/order/details/${id}`
    );

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(createPaymentVNPay.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPaymentVNPay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentUrl = action.payload.url; // Lưu URL thanh toán VNPay
        window.location.href = action.payload.url; // Chuyển hướng đến VNPay
      })
      .addCase(createPaymentVNPay.rejected, (state) => {
        state.isLoading = false;
        state.paymentUrl = null;
      })
      .addCase(capturePaymentVNPay.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePaymentVNPay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.paymentSuccess = action.payload.success; // Lưu trạng thái thanh toán
      })
      .addCase(capturePaymentVNPay.rejected, (state) => {
        state.isLoading = false;
        state.paymentSuccess = false;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;