import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, credentialResponse, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // Nếu người dùng chưa đăng nhập và đang ở trang chính
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else if (credentialResponse) { // Kiểm tra nếu tồn tại credentialResponse
        return <Navigate to="/shop/home" />; // Chuyển hướng đến /shop/home
      } else {
        return <Navigate to="/shop/home" />; // Chuyển hướng đến /shop/home cho người dùng không phải admin
      }
    }
  }

  // Nếu người dùng chưa đăng nhập và không ở trang đăng nhập hoặc đăng ký
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Nếu người dùng đã đăng nhập và đang ở trang đăng nhập hoặc đăng ký
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else if (credentialResponse) { // Kiểm tra nếu tồn tại credentialResponse
      return <Navigate to="/shop/home" />; // Chuyển hướng đến /shop/home
    } else {
      return <Navigate to="/shop/home" />; // Chuyển hướng đến /shop/home cho người dùng không phải admin
    }
  }

  // Nếu người dùng đã đăng nhập nhưng cố gắng truy cập trang admin
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Nếu người dùng là admin và cố gắng truy cập trang shop
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;