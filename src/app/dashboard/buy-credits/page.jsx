"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 1. Importamos el hook de navegación
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// 1. TUS PAQUETES
const PAQUETES = [
  {
    id: "pack_5usd",
    precio: "5.00",
    creditos: 100,
    nombre: "Bolsa Pequeña"
  },
  {
    id: "pack_10usd",
    precio: "10.00",
    creditos: 250,
    nombre: "Bolsa Mediana"
  },
  {
    id: "pack_20usd",
    precio: "20.00",
    creditos: 700,
    nombre: "Bolsa Grande"
  },
];

export default function ComprarCreditos() {
  const router = useRouter(); // 2. Inicializamos el router
  
  // Opcional: He puesto el paquete de $10 como seleccionado por defecto por ser el popular
  const [paqueteSeleccionado, setPaqueteSeleccionado] = useState(PAQUETES[1]);

  const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_PAY,
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Recargar Créditos</h1>

      {/* 2. SELECTOR VISUAL DE PAQUETES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-center">
        {PAQUETES.map((pack) => {
          // Detectamos si es el plan popular
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
              } ${
                // Estilo extra si es el popular pero NO está seleccionado
                !estaSeleccionado && esPopular ? "border-purple-300 shadow-md" : "border-2"
              }`}
            >
              {/* ETIQUETA DE MÁS POPULAR */}
              {esPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
                  Más Popular
                </div>
              )}

              <h3 className={`text-lg font-semibold ${esPopular ? "text-purple-700" : "text-gray-700"}`}>
                {pack.nombre}
              </h3>
              
              <div className={`text-4xl font-bold my-4 ${esPopular ? "text-purple-600" : "text-blue-600"}`}>
                ${pack.precio}
              </div>
              
              <p className="font-medium text-gray-600">
                +{pack.creditos} Créditos
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-8 text-center max-w-md mx-auto">
        Resumen: Pagarás <strong>${paqueteSeleccionado.precio}</strong> y recibirás <strong>{paqueteSeleccionado.creditos} créditos</strong>.
      </div>

      {/* 3. BOTÓN DE PAYPAL */}
      <div className="max-w-md mx-auto relative z-0">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            forceReRender={[paqueteSeleccionado.precio]}
            style={{ layout: "vertical", shape: "rect" }}

            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: `Recarga: ${paqueteSeleccionado.creditos} créditos`,
                    amount: {
                      currency_code: "USD",
                      value: paqueteSeleccionado.precio,
                    },
                    custom_id: JSON.stringify({
                        userId: "USER_ID_REAL", // Recuerda inyectar el ID real
                        packId: paqueteSeleccionado.id,
                        creditos: paqueteSeleccionado.creditos
                    })
                  },
                ],
              });
            }}

            onApprove={async (data, actions) => {
              try {
                // 1. Cobrar el dinero
                const order = await actions.order.capture();
                console.log("Pago exitoso:", order);
                
                // === AQUÍ LLAMADA A TU BACKEND ===
                // await axios.post('/api/add-credits', { orderId: order.id });

                // 2. Redirección al Dashboard
                // Usamos router.push en lugar de solo alert
                router.push("/dashboard"); 
                
              } catch (error) {
                console.error("Error al procesar:", error);
                alert("Hubo un problema procesando tu pago.");
              }
            }}
            
            onError={(err) => {
              console.error("Error PayPal:", err);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
}