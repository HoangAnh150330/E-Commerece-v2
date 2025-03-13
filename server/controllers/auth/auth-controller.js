const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//đăng ký
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "Người dùng đã tồn tại với email này! Vui lòng thử lại",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Đăng ký thành công",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra",
    });
  }
};

//đăng nhập
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "Người dùng không tồn tại! Vui lòng đăng ký trước",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Mật khẩu không đúng! Vui lòng thử lại",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra",
    });
  }
};
//Đăng nhập bằng google 
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("717123618454-qg4f63hq5tqimuitp7186s6koq0u6jpf.apps.googleusercontent.com"); // Thay thế bằng Client ID của bạn

const googleAuth = async (req, res) => {
  const { token } = req.body;

  try {
    // Xác thực token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "717123618454-qg4f63hq5tqimuitp7186s6koq0u6jpf.apps.googleusercontent.com", // Thay thế bằng Client ID của bạn
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Kiểm tra sự tồn tại của người dùng
    let user = await User.findOne({ email });
    if (!user) {
      // Nếu người dùng không tồn tại, tạo tài khoản mới
      user = new User({
        userName: name,
        email: email,
        password: "", // Không cần mật khẩu cho tài khoản Google
        role: "user", // Hoặc bất kỳ vai trò nào bạn muốn
      });
      await user.save();
    }

    // Tạo token JWT
    const jwtToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", jwtToken, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Đăng nhập thành công",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        userName: user.userName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi xác thực Google",
    });
  }
};
//đăng xuất

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Đăng xuất thành công!",
  });
};

//middleware xác thực
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Người dùng không được ủy quyền!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Người dùng không được ủy quyền!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware,googleAuth  };
