"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { motion, Reorder } from "motion/react";
import { toast } from "react-hot-toast";
import {
  addBookmark,
  editBookmark,
  deleteBookmark,
} from "@/app/actions/bookmark";
import { BookmarkRow } from "./bookmark-row";

export default function BookmarkList({ defaultBookmarks }) {
  const [bookmarks, setBookmarks] = React.useState(defaultBookmarks || []);
  const [url, setUrl] = React.useState("");

  const addNewBookmark = async (e) => {
    if (e.key !== "Enter" || url.length === 0) return;

    try {
      const newBookmarks = await addBookmark(url);
      setBookmarks((prevBookmarks) => [...newBookmarks, ...prevBookmarks]);
      setUrl("");
      toast.success("Bookmark added!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to add bookmark");
      } else {
        toast.error("Failed to add bookmark");
      }
    }
  };

  const handleEdit = async (id, newTitle, newUrl) => {
    try {
      await updateBookmark(id, newTitle, newUrl);
      setBookmarks((prevBookmarks) =>
        prevBookmarks.map((bookmark) =>
          bookmark.id === id
            ? { ...bookmark, title: newTitle, url: newUrl }
            : bookmark
        )
      );
      toast.success("Bookmark updated!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to update bookmark");
      } else {
        toast.error("Failed to update bookmark");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBookmark(id);
      setBookmarks((prevBookmarks) =>
        prevBookmarks.filter((bookmark) => bookmark.id !== id)
      );
      toast.success("Bookmark deleted!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Failed to delete bookmark");
      } else {
        toast.error("Failed to delete bookmark");
      }
    }
  };

  const copyToClipboard = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((error) => {
        toast.error("Unable to copy");
        console.error(error);
      });
  };

  return (
    <section className="flex justify-center text-slate-700">
      <motion.div className="mx-auto mt-20 w-[500px] md:mt-40">
        <h1 className="mb-3 font-semibold text-slate-700">Bookmarks</h1>
        <div className="group relative flex items-center">
          <Plus
            size={16}
            className="absolute left-3 z-10 text-slate-400 group-hover:text-slate-700"
          />
          <input
            type="text"
            value={url}
            className="relative w-full rounded bg-slate-200/80 py-2.5 pl-8 pr-3 text-sm text-slate-700 focus:outline-none"
            placeholder="Insert link..."
            onChange={(e) => setUrl(e.target.value)}
            onKeyUp={addNewBookmark}
          />
        </div>
        <div className="flex w-full select-none flex-col font-[450]">
          <Reorder.Group axis="y" values={bookmarks} onReorder={setBookmarks}>
            {bookmarks.map((bookmark) => (
              <BookmarkRow
                key={bookmark.id}
                bookmark={bookmark}
                copyLink={copyToClipboard}
                editBookmark={handleEdit}
                deleteBookmark={handleDelete}
              />
            ))}
          </Reorder.Group>
        </div>
      </motion.div>
    </section>
  );
}
