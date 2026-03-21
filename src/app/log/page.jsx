"use client";
import { LoginForm } from "@/components/log/login/login-form"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
    useEffect(() => {
      try {
        const authToken = localStorage.getItem(
          "sb-bockeheqvteruvwulvhn-auth-token",
        );
  
        if (authToken) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking localStorage auth:", error);
      }
    }, []);
  return (
    <div
      className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
