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

//! Get calendar events
export async function getEvents(date) {
  const supabase = await createClient();
  const user = await getUserData();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("date", date)
    .eq("user_id", user.id)
    .order("time", { ascending: true });

  if (error) throw new Error(`Error getting calendar events: ${error.message}`);

  return data || [];
}

//! Add calendar event
export async function addEvent(title, description, time, date) {
  const supabase = await createClient();
  const user = await getUserData();

  const { data, error } = await supabase
    .from("events")
    .insert([{ user_id: user.id, title, description, time, date }])
    .select();

  if (error) throw new Error(`Error adding calendar event: ${error.message}`);

  return data ? data[0] : null && revalidatePath("/dashboard");
}

//! Edit calendar event
export async function updateEvent(id, title, description, time) {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase
    .from("events")
    .update({ title, description, time })
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) throw new Error(`Error editing calendar event: ${error.message}`);

  revalidatePath("/dashboard");
}

//! Delete calendar event
export async function deleteEvent(id) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) throw new Error(`Error deleting calendar event: ${error.message}`);

  revalidatePath("/dashboard");
}
