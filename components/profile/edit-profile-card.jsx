"use client";
import * as React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Mail, User as UserIcon, Globe } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadAvatar } from "./upload-avatar";

export default function EditProfileCard({ user }) {
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState(null);
  const [website, setWebsite] = React.useState(null);
  const [avatar_url, setAvatarUrl] = React.useState(null);
  const supabase = createClient();
  const router = useRouter();

  const getProfile = React.useCallback(async () => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("profiles")
        .select(`name, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setName(data.name);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error("User data loading failed:", error);
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  React.useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({ name, website, avatar_url }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        name,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Successfully updated profile.");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Error updating profile.");
    } finally {
      setLoading(false);
      router.push("/profile");
    }
  }

  return (
    <div className="mx-auto mb-16 flex max-w-2xl w-full flex-col items-center justify-center gap-8 px-2 sm:rounded-lg sm:border border sm:bg-card sm:px-8 sm:py-12 sm:shadow-lg dark:border-foreground">
      <form className="flex w-full space-y-4 flex-col">
        <UploadAvatar
          uid={user?.id ?? null}
          url={avatar_url}
          size={160}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ name, website, avatar_url: url });
          }}
        />

        <h1 className="font-semibold text-center">Edit Profile</h1>

        <div className="space-y-4 max-w-lg w-full mx-auto">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="text"
                value={user?.email}
                disabled
                className="pl-10"
              />{" "}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
              />{" "}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium">
              Website
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="website"
                type="url"
                value={website || ""}
                onChange={(e) => setWebsite(e.target.value)}
                className="pl-10"
              />{" "}
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            onClick={() => updateProfile({ name, website, avatar_url })}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Updating...
              </div>
            ) : (
              "Update Profile"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
