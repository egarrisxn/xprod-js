"use client";
import * as React from "react";
import { Plus } from "lucide-react";
import { addNote } from "@/app/actions/note";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddNote() {
  const ref = React.useRef(null);
  return (
    <form
      className="flex items-center gap-2 outline-none"
      ref={ref}
      action={async (formData) => {
        await addNote(formData);
        ref.current?.reset();
      }}
    >
      <Button className="size-5 rounded-sm bg-gradient-to-r from-indigo-500 to-purple-500 p-0 hover:from-indigo-600 hover:to-purple-600">
        <Plus className="size-4" />
        <span className="sr-only">Add Note</span>
      </Button>
      <Input
        type="text"
        id="thought"
        name="thought"
        className="border-none p-0 focus-visible:ring-transparent"
        placeholder="Add new thought"
        required
      />
    </form>
  );
}
