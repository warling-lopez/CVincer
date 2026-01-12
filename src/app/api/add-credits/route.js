import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. Instanciamos el cliente ADMIN
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY 
    );

    const body = await request.json();
    const { orderData } = body;

    // 2. Validación de PayPal
    if (!orderData || orderData.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Pago incompleto' }, { status: 400 });
    }

    // 3. Extraer info
    const customId = orderData.purchase_units?.[0]?.custom_id;
    if (!customId) return NextResponse.json({ error: 'No user data' }, { status: 400 });

    // Nota: Asegúrate de que 'creditos' es como lo envías desde el front en el JSON
    const { userId, creditos } = JSON.parse(customId);

    console.log(`💰 Sumando ${creditos} créditos al usuario: ${userId}`);

    // ==========================================
    // 4. ACTUALIZACIÓN EN TABLA 'PLANS'
    // ==========================================
    
    // PASO A: Leer saldo actual en la tabla 'plans'
    // Usamos .eq('user_id', userId) porque buscamos el plan DE ese usuario
    const { data: planActual, error: fetchError } = await supabaseAdmin
      .from('plans')            // <--- CORREGIDO: Nombre de tu tabla
      .select('credits')        // <--- CORREGIDO: Nombre de tu columna
      .eq('user_id', userId)    // <--- CORREGIDO: Buscamos por la columna 'user_id'
      .maybeSingle();           // Usamos maybeSingle() por seguridad (devuelve null si no existe en vez de error)

    if (fetchError) {
        console.error("Error leyendo plan:", fetchError);
        throw fetchError;
    }

    // Si el usuario no tiene fila en 'plans', decidimos si crearla o dar error.
    // Aquí asumimos que ya tiene un plan creado y sumamos.
    const saldoAnterior = planActual?.credits || 0;
    const nuevoSaldo = saldoAnterior + Number(creditos);

    // PASO B: Actualizar el saldo
    const { error: updateError } = await supabaseAdmin
      .from('plans')
      .update({ credits: nuevoSaldo }) // <--- CORREGIDO: Columna 'credits'
      .eq('user_id', userId);          // <--- CORREGIDO: Filtro por 'user_id'

    if (updateError) {
        console.error("Error actualizando plan:", updateError);
        throw updateError;
    }

    return NextResponse.json({ 
      success: true, 
      message: `¡Éxito! Nuevo saldo: ${nuevoSaldo}` 
    });

  } catch (error) {
    console.error("❌ Error en la API:", error.message);
    return NextResponse.json({ error: 'Error interno: ' + error.message }, { status: 500 });
  }
}