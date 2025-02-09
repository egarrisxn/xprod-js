"use client";
import * as React from "react";
import { editTodo } from "@/app/actions/todo";
import { Input } from "@/components/ui/input";

export function TodoInput({ todo }) {
  const [description, setDescription] = React.useState(todo.task);
  const [typingTimeout, setTypingTimeout] = React.useState(null);

  React.useEffect(() => {
    setDescription(todo.task);
  }, [todo.task]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setDescription(newValue);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(async () => {
        await editTodo({ ...todo, task: e.target.value });
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
