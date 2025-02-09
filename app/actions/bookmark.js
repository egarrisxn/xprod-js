"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { getUrlMetadata } from "@/utils/helpers";

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

//! Get bookmarks
export async function getBookmarks() {
  const supabase = await createClient();
  const user = await getUserData();

  const { data, error } = await supabase
    .from("bookmarks")
    .select()
    .eq("user_id", user?.id)
    .order("inserted_at", { ascending: false });

  if (error) throw new Error(`Error getting bookmarks: ${error.message}`);

  return data || [];
}

//! Add bookmark
export async function addBookmark(url) {
  const supabase = await createClient();
  const user = await getUserData();
  const { title, favicon } = await getUrlMetadata(url);

  const newBookmark = {
    title,
    url,
    image_url: favicon,
    user_id: user.id,
    inserted_at: new Date(),
  };

  const { data, error } = await supabase
    .from("bookmarks")
    .insert(newBookmark)
    .select();

  if (error) throw new Error(`Error adding bookmark: ${error.message}`);

  return data || [];
}

//! Edit bookmark
export async function editBookmark(id, title, url) {
  const supabase = await createClient();
  const user = await getUserData();

  const { error } = await supabase
    .from("bookmarks")
    .update({ title, url })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) throw new Error(`Error editing bookmark: ${error.message}`);

  revalidatePath("/dashboard");
}

//! Delete bookmark
export async function deleteBookmark(id) {
  const supabase = await createClient();

  const { error } = await supabase.from("bookmarks").delete().eq("id", id);

  if (error) throw new Error(`Error deleting bookmark: ${error.message}`);

  revalidatePath("/dashboard");
}
