"use client";
import * as React from "react";
import Link from "next/link";
import { Pencil, Trash2, Copy } from "lucide-react";

export function BookmarkRow({
  bookmark,
  copyLink,
  editBookmark,
  deleteBookmark,
}) {
  const handleEdit = () => {
    const newTitle = window.prompt("Enter new title", bookmark.title);
    const newUrl = window.prompt("Enter new URL", bookmark.url);

    if (newTitle && newUrl) {
      editBookmark(bookmark.id, newTitle, newUrl);
    }
  };

  const handleDelete = () => {
    deleteBookmark(bookmark.id);
  };

  return (
    <div className="group -mx-2 flex items-center rounded p-1">
      <Link
        target="_blank"
        href={bookmark.url}
        className="my-0 flex items-center gap-1 truncate p-1 text-sm text-slate-700 hover:text-slate-900"
      >
        {bookmark.image_url && (
          <img src={bookmark.image_url} alt={bookmark.title} className="w-4" />
        )}
        <span>{bookmark.title}</span>
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden group-hover:flex">
          <button
            className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
            onClick={() => copyLink(bookmark.url)}
          >
            <Copy size={16} />
          </button>
          <button
            className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
            onClick={handleEdit}
          >
            <Pencil size={16} />
          </button>
          <button
            className="rounded p-1 text-red-400 hover:bg-red-100 hover:text-red-600"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
