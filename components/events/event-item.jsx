"use client";
import * as React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventItem({ event, onEdit, onDelete }) {
  return (
    <li className="flex items-center gap-2">
      <div className="pt-1 text-sm font-medium">{event.time}</div>
      <div className="flex flex-1 flex-col border-l pl-2">
        <div className="truncate font-bold">{event.title}</div>
        <div className="text-sm text-muted-foreground">{event.description}</div>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon" className="size-4" onClick={onEdit}>
          <Edit className="size-3" />
          <span className="sr-only">Edit event</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-4 text-red-400"
          onClick={onDelete}
        >
          <Trash2 className="size-3" />
          <span className="sr-only">Delete event</span>
        </Button>
      </div>
    </li>
  );
}
