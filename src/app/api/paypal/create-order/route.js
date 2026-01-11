import { createPaypalOrder } from '@/services/payments.service';

export async function POST() {
  try {
    const order = await createPaypalOrder(10);
    return Response.json(order);
  } catch (err) {
    return Response.json(
      { error: 'Error creando orden' },
      { status: 500 }
    );
  }
}
