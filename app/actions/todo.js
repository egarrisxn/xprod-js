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

//! Get to-dos
export async function getTodos() {
  const supabase = await createClient();
  const user = await getUserData();

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.id);

  if (error) throw new Error(`Error fetching to-dos: ${error.message}`);

  return data || [];
}

//! Add to-do
export async function addTodo(formData) {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase
    .from("todos")
    .insert([
      {
        user_id: user.id,
        task: formData.get("task"),
        is_complete: false,
        inserted_at: new Date(),
      },
    ])
    .select();

  if (error) throw new Error(`Error adding todo: ${error.message}`);

  revalidatePath("/dashboard");
}

//! Edit to-do
export async function editTodo(todo) {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase
    .from("todos")
    .update({ task: todo.task })
    .eq("id", todo.id)
    .eq("user_id", user.id)
    .select();

  if (error) throw new Error(`Error editing to-do: ${error.message}`);
}

//! Mark to-do complete/incomplete
export async function onCheckChange(todo) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("todos")
    .update({ is_complete: !todo.is_complete })
    .eq("id", todo.id)
    .select();

  if (error) throw new Error(`Error changing todo status: ${error.message}`);

  revalidatePath("/dashboard");
}

//! Delete to-do
export async function deleteTodo(id) {
  const supabase = await createClient();

  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) throw new Error(`Error deleting to-do: ${error.message}`);

  revalidatePath("/dashboard");
}

//! Delete completed to-do
export async function deleteCompletedTodos() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("is_complete", true);

  if (error)
    throw new Error(`Error deleting completed to-dos: ${error.message}`);

  revalidatePath("/dashboard");
}

//! Delete all to-dos
export async function deleteAllTodos() {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("user_id", user.id);

  if (error) throw new Error(`Error deleting all to-dos: ${error.message}`);

  revalidatePath("/dashboard");
}
