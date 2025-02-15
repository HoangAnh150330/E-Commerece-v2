import { useToast } from "@/components/ui/use-toast";
import { loginUser , googleAuth } from "@/store/auth-slice"; // Cập nhật import
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser (formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate('/shop/home');
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Đăng nhập vào tài khoản của bạn
        </h1>
        <p className="mt-2">
          Bạn chưa có tài khoản?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Đăng ký
          </Link>
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full border rounded p-2"
          required
        />
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Đăng nhập
          </button>
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              dispatch(googleAuth(credentialResponse.credential)).then((data) => {
                if (data?.payload?.success) {
                  toast({
                    title: data?.payload?.message,
                  });
                  navigate('/shop/home');
                } else {
                  toast({
                    title: data?.payload?.message,
                    variant: "destructive",
                  });
                }
              });
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            className="ml-2 w-full"
          />
        </div>
      </form>
    </div>
  );
}

export default AuthLogin;