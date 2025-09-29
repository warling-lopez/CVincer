"use client";

import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle } from "lucide-react";
import supabase from "@/supabase/supabase";

export default function WaitlistAlert() {
  const [user, setUser] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error al obtener sesión:", error);
        return;
      }

      if (session) {
        setUser(session.user);
      }
    }

    checkSession();
  }, []);

  // Cierra el alert cuando se haga click en cualquier parte
  useEffect(() => {
    const handleClick = () => setVisible(false);

    if (visible) {
      window.addEventListener("click", handleClick);
    }

    return () => window.removeEventListener("click", handleClick);
  }, [visible]);

  if (!user || !visible) {
    return null; // No muestra nada si no hay sesión o si ya se cerró
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Alert
        variant="float"
        className="border-green-500 bg-green-50 text-center flex justify-center flex-col gap-4"
      >
        {/* Icono principal */}
        <div className="flex justify-center place-items-center mx-auto mb-2">
          <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600" />
        </div>

        {/* Título y descripción */}
        <AlertTitle className="text-xl mx-auto sm:text-2xl font-semibold">
          ¡Gracias por registrarte!
        </AlertTitle>
        <AlertDescription className="text-sm sm:text-base mx-auto text-gray-700">
          Te has unido exitosamente a nuestra lista de espera
        </AlertDescription>

        {/* Email del usuario */}
        <div className="bg-green-100 border border-green-200 rounded-lg p-3 mt-2">
          <div className="flex items-center justify-center gap-2 text-green-700">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium text-sm sm:text-base">
              Estás registrado con el correo: {user.email}
            </span>
          </div>
        </div>

        {/* Info adicional */}
        <div className="text-sm text-gray-600 space-y-2 mt-2">
          <p>
            Toda la información sobre la demo y próximas actualizaciones será
            enviada al correo que proporcionaste.
          </p>
          <p className="font-medium">¡Mantente atento a tu bandeja de entrada!</p>
        </div>
      </Alert>
    </div>
  );
}
