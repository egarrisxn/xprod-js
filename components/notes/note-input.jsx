"use client";
import * as React from "react";
import { editNote } from "@/app/actions/note";
import { Input } from "@/components/ui/input";

export default function NoteInput({ note }) {
  const [description, setDescription] = React.useState(note.thought);
  const [typingTimeout, setTypingTimeout] = React.useState(null);

  React.useEffect(() => {
    setDescription(note.thought);
  }, [note.thought]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setDescription(newValue);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(async () => {
        await editNote({ ...note, thought: e.target.value });
      }, 2000)
    );
  };

  return (
    <Input
      className="border-none p-0 focus-visible:ring-transparent"
      value={description}
      onChange={handleInputChange}
    />
  );
}
