"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

//!? Auth user utility
async function getUserData() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw new Error(`Auth error: ${error.message}`);
  if (!user) throw new Error("User not authenticated");

  return user;
}

//! Get timer sessions
export async function getSessions() {
  const supabase = await createClient();
  const user = await getUserData();

  const { data, error } = await supabase
    .from("timer")
    .select("*")
    .eq("user_id", user.id)
    .order("started_at", { ascending: false });

  if (error) throw new Error(`Error getting timer sessions: ${error.message}`);

  return data || [];
}

//! Add timer session
export async function addSession(mode, duration) {
  const supabase = await createClient();
  const user = await getUserData();

  const { data, error } = await supabase
    .from("timer")
    .insert([
      {
        user_id: user.id,
        mode,
        duration,
        started_at: new Date(),
        completed: false,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(`Error adding timer session: ${error.message}`);

  revalidatePath("/dashboard");
  return data;
}

//! Complete timer session
export async function completeSession(id) {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase
    .from("timer")
    .update({ completed: true })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(`Error updating timer session: ${error.message}`);

  revalidatePath("/dashboard");
}

//! Delete timer session
export async function deleteSession(id) {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase
    .from("timer")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(`Error deleting timer session: ${error.message}`);

  revalidatePath("/dashboard");
}
