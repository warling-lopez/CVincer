import paypal from '@paypal/checkout-server-sdk';
import { paypalClient } from '@/lib/paypal/client';

export async function createPaypalOrder(amount) {
  if (amount <= 0) throw new Error('Monto inválido');

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: amount.toFixed(2)
      }
    }]
  });

  const res = await paypalClient.execute(request);
  return res.result;
}
