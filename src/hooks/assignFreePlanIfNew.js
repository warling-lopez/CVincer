import supabase from "@/supabase/supabase";

/**
 * Asigna automáticamente un plan free a un usuario si no tiene ninguno
 * @param {string} userId - ID del usuario en Supabase
 */
export async function assignFreePlanIfNew(userId) {
  if (!userId) return;

  // 1. Verificar si el usuario ya tiene un plan
  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .eq("user_id", userId)
    .limit(1);

  if (error) {
    console.error("Error verificando plan:", error);
    return;
  }

  // 2. Si no tiene plan, asignar free
  if (!data || data.length === 0) {
    const { error: insertError } = await supabase.from("plans").insert([
      {
        user_id: userId,
        plan_type: "free",
        plan_name: "Free Plan",
        credits: 1000,
        months_free: 0,
        status: "active",
      },
    ]);

    if (insertError) {
      console.error("Error asignando plan FREE:", insertError);
    } else {
      console.log("Plan FREE asignado correctamente al usuario:", userId);
    }
  } else {
    console.log("Usuario ya tiene un plan:", data[0].plan_name);
  }
}
