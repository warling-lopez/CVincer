"use client"
import { LoginForm } from "@/components/log/login/login-form"
import { RegisterForm } from "@/components/log/logup/register-form"
import { useEffect, useState } from "react";
import { set } from "zod";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const storedIsLogin = sessionStorage.getItem("isLogin");
    setIsLogin(storedIsLogin);
  }, []);
  
  return (
    <div
      className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}
