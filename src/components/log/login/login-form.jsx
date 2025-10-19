"use client";

import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import supabase from "@/supabase/supabase";

export function LoginForm({ className, ...props }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    if (email && email.includes("@")) {
      try {
        const { data, error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            emailRedirectTo: "/dashboard",
          },
        });

        if (error) {
          console.error("Error al enviar el enlace mágico:", error.message);
          alert(
            "Error al enviar el enlace mágico. Por favor intenta de nuevo."
          );
        } else {
          alert("¡Enlace mágico enviado! Revisa tu correo electrónico.");
          // Opcional: cerrar el dialog después del éxito
          // document.querySelector('[data-dialog-close]')?.click();
        }
      } catch (err) {
        console.error("Error inesperado:", err);
        alert("Se produjo un error inesperado. Por favor intenta de nuevo.");
      }
    } else {
      alert("Por favor ingresa una dirección de correo electrónico válida.");
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://cvincer.com/dashboard",
        },
      });
      if (error) {
        console.error("Error al iniciar sesión con Google:", error.message);
        alert("Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.");
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      alert("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">CVincer.</span>
            </a>
            <h1 className="text-xl font-bold">
              Bienvenido a <span className="text-chart-3">CVincer</span>.
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                className="py-5"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-chart-3">
              Iniciar sesión
            </Button>
          </div>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              O
            </span>
          </div>
        </div>
      </form>
      <div className="grid gap-4 ">
        <Button variant="outline" onClick={handleGoogleSignIn} type="button" className="w-full text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Continuar con Google
        </Button>
      </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <a href="/terms-of-service">Términos de servicio</a> y la{" "}
        <a href="/refund-policy">Política de privacidad</a>.
      </div>
    </div>
  );
}
