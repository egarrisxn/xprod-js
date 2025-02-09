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

//! Get notes
export async function getNotes() {
  const supabase = await createClient();
  const user = await getUserData();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw new Error(`Error getting notes: ${error.message}`);

  return data || [];
}

//! Add note
export async function addNote(formData) {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase.from("notes").insert([
    {
      user_id: user.id,
      thought: formData.get("thought"),
      inserted_at: new Date(),
    },
  ]);

  if (error) throw new Error(`Error adding note: ${error.message}`);

  revalidatePath("/dashboard");
}

//! Edit note
export async function editNote(note) {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase
    .from("notes")
    .update({ thought: note.thought })
    .eq("id", note.id)
    .eq("user_id", user.id);

  if (error) throw new Error(`Error editing note: ${error.message}`);
}

//! Delete note
export async function deleteNote(id) {
  const supabase = await createClient();

  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) throw new Error(`Error deleting note: ${error.message}`);

  revalidatePath("/dashboard");
}
