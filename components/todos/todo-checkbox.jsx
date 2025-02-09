"use client";
import * as React from "react";
import { onCheckChange } from "@/app/actions/todo";
import { Checkbox } from "@/components/ui/checkbox";

export function TodoCheckbox({ todo }) {
  return (
    <Checkbox
      className="mt-0.5 size-5"
      id={todo?.id}
      checked={todo?.is_complete}
      onCheckedChange={() => onCheckChange(todo)}
    />
  );
}
