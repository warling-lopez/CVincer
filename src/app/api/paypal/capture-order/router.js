import { capturePaypalOrder } from '@/services/payments.service';

export async function POST(req) {
  const { orderID } = await req.json();

  const result = await capturePaypalOrder(orderID);
  return Response.json(result);
}
