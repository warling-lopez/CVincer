"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function App() {
  const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_PAY,
    currency: "USD",
    intent: "capture",
  };
  return (
    <div className="App">
      <h1 className="bg-red-200">hola</h1>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons />
      </PayPalScriptProvider>
    </div>
  );
}
