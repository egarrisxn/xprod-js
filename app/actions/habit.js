"use server";
import { createClient } from "@/utils/supabase/server";
import { calculateStreak } from "@/utils/helpers";

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

//! Get habits
export async function getHabits() {
  const supabase = await createClient();
  const user = await getUserData();

  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", user?.id);

  if (error) {
    console.error("Error fetching habits:", error);
    throw new Error(error.message);
  }
  return data || [];
}

//! Add habit
export async function addHabit(name) {
  const supabase = await createClient();
  const user = await getUserData();

  const { data, error } = await supabase
    .from("habits")
    .insert([{ user_id: user.id, name, created_at: new Date().toISOString() }])
    .select();
  if (error) {
    console.error("Error adding habit:", error);
    return null;
  }
  return data[0];
}

//! Delete habit
export async function deleteHabit(id) {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase
    .from("habits")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);
  if (error) {
    console.error("Error deleting habit:", error);
    return false;
  }
  return true;
}

//! Log a habit day
export async function logHabitDay(id, date) {
  const supabase = await createClient();
  const { data: habit, error: fetchError } = await supabase
    .from("habits")
    .select("completed")
    .eq("id", id)
    .single();

  if (fetchError || !habit) {
    console.error("Error fetching habit:", fetchError);
    return null;
  }

  const updatedCompleted = [...new Set([...habit.completed, date])];
  const newStreak = calculateStreak(updatedCompleted);

  const { error } = await supabase
    .from("habits")
    .update({ completed: updatedCompleted, streak: newStreak })
    .eq("id", id);

  if (error) {
    console.error("Error logging habit:", error);
    return null;
  }

  return updatedCompleted;
}

//! Unlog a habit day
export async function unlogHabitDay(id, date) {
  const supabase = await createClient();
  const { data: habit, error: fetchError } = await supabase
    .from("habits")
    .select("completed")
    .eq("id", id)
    .single();

  if (fetchError || !habit) {
    console.error("Error fetching habit:", fetchError);
    return null;
  }

  const updatedCompleted = habit.completed.filter((d) => d !== date);

  const { error } = await supabase
    .from("habits")
    .update({ completed: updatedCompleted })
    .eq("id", id);

  if (error) {
    console.error("Error unlogging habit:", error);
    return null;
  }

  return updatedCompleted;
}
