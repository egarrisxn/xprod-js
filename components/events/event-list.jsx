"use client";
import * as React from "react";
import { EventItem } from "./event-item";

export function EventList({ events, onEditEvent, onDeleteEvent }) {
  return events.length > 0 ? (
    <ul className="space-y-2">
      {events.map((event) => (
        <EventItem
          key={event.id}
          event={event}
          onEdit={() => onEditEvent(event)}
          onDelete={() => onDeleteEvent(event)}
        />
      ))}
    </ul>
  ) : (
    <p className="text-muted-foreground">No events scheduled for this day.</p>
  );
}
