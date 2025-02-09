"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

//! Sign up user
export async function signUpUser({ data, emailRedirectTo }) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: { emailRedirectTo },
  });
  if (error) throw new Error(`Error signing up: ${error.message}`);
  return redirect("/sign-in");
}

//! Sign in user
export async function signInUser(data) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) throw new Error(`Error signing in: ${error.message}`);
  return redirect("/dashboard");
}

//! Sign out user
export async function signOutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/");
}

//! Get user data with avatar
export async function getUserAndAvatar() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError || !authData?.user) return null;
  const user = authData.user;
  const { data: userProfile, error: profileError } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("id", user.id)
    .single();
  if (profileError) {
    return { error: "Avatar not found or failed to load." };
  }
  return {
    id: user.id,
    email: user.email,
    avatarUrl: userProfile?.avatar_url
      ? `https://ilguvbltlgafvgxgpdbl.supabase.co/storage/v1/object/public/avatars/${userProfile.avatar_url}`
      : null,
  };
}
