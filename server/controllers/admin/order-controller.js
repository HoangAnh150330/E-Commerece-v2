const Order = require("../../models/Order");

const getAllOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng nào!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra!",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra!",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng!",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái đơn hàng thành công!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra!",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
