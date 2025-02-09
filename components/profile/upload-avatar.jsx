"use client";
import * as React from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";

export function UploadAvatar({ uid, url, onUpload }) {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = React.useState(url);
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert(error || "Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-40 rounded-full">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={160}
            height={160}
            className="rounded-full aspect-square object-cover border-2 border-foreground"
          />
        ) : (
          <Image
            src="/avatars/user.png"
            alt="Fallback Avatar"
            width={160}
            height={160}
            className="rounded-full aspect-square object-cover border-2 border-foreground"
          />
        )}
      </div>

      <div className="mx-auto flex flex-col text-center">
        <label htmlFor="single" className="font-medium hover:cursor-pointer">
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
          className="hidden"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
