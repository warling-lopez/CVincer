"use client";

import { useState, useEffect } from "react";
import supabase from "@/supabase/supabase";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function SourcePopup({ user }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(["Reddit", "hard_dev", "Amigos"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function checkPlan() {
      try {
        // Verifica si el usuario ya tiene un plan temporal
        const { data, error } = await supabase
          .from("plans")
          .select("*")
          .eq("user_id", user.id)
          .eq("plan_type", "temporal")
          .limit(1);

        if (error) {
          console.error("Error verificando plan:", error);
          setLoading(false);
          return;
        }

        // Mostrar popup solo si no tiene plan temporal y no completó onboarding
        if ((!data || data.length === 0) && !localStorage.getItem("onboarding_done")) {
          setOpen(true);
        }
      } catch (err) {
        console.error("Error inesperado al verificar plan:", err);
      } finally {
        setLoading(false);
      }
    }

    checkPlan();
  }, [user]);

  const handleSelect = async (option) => {
    setOpen(false);
    localStorage.setItem("onboarding_done", "true");

    try {
      if (option === "hard_dev") {
        // Asigna el plan Hard Devs al usuario
        const { error } = await supabase.from("plans").insert([
          {
            user_id: user.id,
            plan_type: "temporal",
            plan_name: "Hard Devs",
            credits: 100,
            week_free: 3,
            status: "active",
          },
        ]);

        if (error) console.error("Error asignando plan Hard Devs:", error);
        else console.log("Plan Hard Devs asignado correctamente");
      } else {
        // Guarda la fuente en otra tabla
        const { error } = await supabase.from("user_sources").insert([
          {
            user_id: user.id,
            source: option,
          },
        ]);
        if (error) console.error("Error guardando fuente:", error);
        else console.log("Fuente guardada correctamente:", option);
      }
    } catch (err) {
      console.error("Error inesperado al manejar selección:", err);
    }
  };

  if (loading) return null; // Espera a que la query termine

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader>
          <DialogTitle>🎉 Bienvenido!</DialogTitle>
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </button>
        </DialogHeader>

        <div className="mt-4">
          <p>¿De dónde nos conociste?</p>
          <div className="mt-3 flex flex-col gap-2">
            {options.map((opt) => (
              <Button
                key={opt}
                variant="outline"
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </Button>
            ))}
          </div>
        </div>

        <DialogFooter>
          <p className="text-sm text-gray-400 mt-2">
            Puedes cerrar esta ventana y contestarlo después.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
