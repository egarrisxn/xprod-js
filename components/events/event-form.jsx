"use client";
import * as React from "react";
import { addEvent, updateEvent } from "@/app/actions/event";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EventForm({ event, selectedDate, onEventSaved, onCancel }) {
  const [title, setTitle] = React.useState(event?.title || "");
  const [description, setDescription] = React.useState(
    event?.description || ""
  );
  const [time, setTime] = React.useState(event?.time || "12:00");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description && time) {
      setIsLoading(true);
      try {
        if (event) {
          await updateEvent(event.id, title, description, time);
        } else {
          await addEvent(
            title,
            description,
            time,
            selectedDate.toISOString().split("T")[0]
          );
        }
        onEventSaved();
      } catch (error) {
        console.error("Error saving event:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event description"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving" : event ? "Update Event" : "Save Event"}
        </Button>
      </div>
    </form>
  );
}
