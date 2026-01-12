
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inicializamos Supabase con la llave MAESTRA (Service Role)
// Esto permite saltarse las reglas de seguridad (RLS) para escribir los créditos
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY 
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderData } = body;

    // 1. VALIDACIÓN BÁSICA
    // En producción, deberías verificar de nuevo con la API de PayPal 
    // usando el orderData.id para asegurar que no sea un JSON falso.
    if (!orderData || !orderData.status === 'COMPLETED') {
        return NextResponse.json({ error: 'Pago no válido' }, { status: 400 });
    }

    // 2. EXTRAER DATOS DEL CUSTOM_ID
    // Aquí recuperamos lo que escondimos en el botón del frontend
    const customIdString = orderData.purchase_units[0].custom_id;
    
    // Parseamos el string JSON
    const { userId, creditos } = JSON.parse(customIdString);

    if (!userId || !creditos) {
      return NextResponse.json({ error: 'Faltan datos de usuario o créditos' }, { status: 400 });
    }

    console.log(`Procesando: Usuario ${userId} compró ${creditos} créditos.`);

    // 3. ACTUALIZAR SUPABASE
    // Opción A: Usando una función RPC (Recomendado, crea esta función en tu SQL de Supabase)
    const { error } = await supabaseAdmin.rpc('incrementar_creditos', {
      user_id: userId,
      cantidad: creditos
    });

    /* // Opción B: Actualización directa (Si no tienes la función RPC creada)
    /*
    const { data: usuarioActual } = await supabaseAdmin.from('users').select('creditos').eq('id', userId).single();
    const nuevosCreditos = (usuarioActual?.creditos || 0) + creditos;
    
    const { error } = await supabaseAdmin
      .from('users') // O 'profiles'
      .update({ creditos: nuevosCreditos })
      .eq('id', userId);
    */

    if (error) {
      console.error("Error Supabase:", error);
      return NextResponse.json({ error: 'Error actualizando base de datos' }, { status: 500 });
    }

    // 4. RESPUESTA ÉXITOSA
    return NextResponse.json({ success: true, message: 'Créditos añadidos correctamente' });

  } catch (error) {
    console.error("Error fatal:", error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}