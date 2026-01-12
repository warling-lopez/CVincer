"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import supabase from "@/supabase/supabase";

const PAQUETES = [
  { id: "pack_5usd", precio: "5.00", creditos: 100, nombre: "Bolsa Pequeña" },
  { id: "pack_10usd", precio: "10.00", creditos: 250, nombre: "Bolsa Mediana" },
  { id: "pack_20usd", precio: "20.00", creditos: 700, nombre: "Bolsa Grande" },
];

export default function ComprarCreditos() {
  const router = useRouter();
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(PAQUETES[1]);
  
  // Estado para el usuario y para saber si está cargando
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. CORRECCIÓN: useEffect limpio para obtener el usuario al cargar
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false); // Ya terminamos de cargar
    };

    getUser();
  }, []);

  const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_PAY,
    currency: "USD",
    intent: "capture",
  };

  const handleApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      console.log("Pago capturado en PayPal:", order);

      const response = await fetch("/api/add-credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderData: order 
        }),
      });

      if (!response.ok) throw new Error("Error en el servidor al guardar créditos");

      alert(`¡Éxito! Créditos agregados.`);
      router.push("/dashboard");

    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema guardando tus créditos. Contacta soporte.");
    }
  };

  // 2. CORRECCIÓN: Si está cargando o no hay usuario, protegemos la vista
  if (loading) return <div className="text-center p-10">Cargando...</div>;
  
  if (!user) return (
    <div className="text-center p-10 text-red-500 font-bold">
      Debes iniciar sesión para comprar créditos.
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Recargar Créditos</h1>

      {/* SELECTOR VISUAL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-center">
        {PAQUETES.map((pack) => {
          const esPopular = pack.id === "pack_10usd";
          const estaSeleccionado = paqueteSeleccionado.id === pack.id;
          return (
            <div
              key={pack.id}
              onClick={() => setPaqueteSeleccionado(pack)}
              className={`relative cursor-pointer rounded-xl p-6 text-center transition-all duration-300 ${
                estaSeleccionado
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200 shadow-lg transform scale-105"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
              } ${!estaSeleccionado && esPopular ? "border-purple-300 shadow-md" : "border-2"}`}
            >
              {esPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase">
                  Más Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-700">{pack.nombre}</h3>
              <div className="text-4xl font-bold my-4 text-blue-600">${pack.precio}</div>
              <p className="font-medium text-gray-600">+{pack.creditos} Créditos</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-8 text-center max-w-md mx-auto">
        Resumen: Pagarás <strong>${paqueteSeleccionado.precio}</strong> por <strong>{paqueteSeleccionado.creditos} créditos</strong>.
      </div>

      {/* BOTÓN PAYPAL */}
      <div className="max-w-md mx-auto relative z-0">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            forceReRender={[paqueteSeleccionado.precio]}
            style={{ layout: "vertical", shape: "rect" }}
            
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  description: `Recarga: ${paqueteSeleccionado.creditos} créditos`,
                  amount: { currency_code: "USD", value: paqueteSeleccionado.precio },
                  // 3. CORRECCIÓN: Usamos el ID real del usuario del estado
                  custom_id: JSON.stringify({
                      userId: user.id, // <--- Aquí ya usamos el ID real de Supabase
                      creditos: paqueteSeleccionado.creditos
                  })
                }],
              });
            }}
            
            onApprove={handleApprove}
            onError={(err) => console.error("Error PayPal:", err)}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}