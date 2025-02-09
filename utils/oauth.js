import { createClient } from "./supabase/client";

export const loginWithGitHub = () => {
  const supabase = createClient();

  supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
};

export const loginWithGoogle = () => {
  const supabase = createClient();
  supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });
};
