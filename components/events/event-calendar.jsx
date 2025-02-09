"use client";
import * as React from "react";
import { Loader2, Plus } from "lucide-react";
import { getEvents, deleteEvent } from "@/app/actions/event";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { EventForm } from "./event-form";
import { EventList } from "./event-list";

export default function EventCalendar() {
  const [events, setEvents] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(undefined);

  const fetchEvents = React.useCallback(async (selectedDate) => {
    setIsLoading(true);
    try {
      const events = await getEvents(selectedDate.toISOString().split("T")[0]);
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchEvents(date);
  }, [date, fetchEvents]);

  const handleEventSaved = () => {
    setIsDialogOpen(false);
    setSelectedEvent(undefined);
    fetchEvents(date);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteEvent = async (event) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(event.id);
        fetchEvents(date);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const formatCalendarDate = (date, dateFormat = "MMMM d, yyyy") => {
    const options = {};
    if (dateFormat.includes("MMMM")) {
      options.month = "long";
    } else if (dateFormat.includes("MMM")) {
      options.month = "short";
    } else if (dateFormat.includes("MM")) {
      options.month = "2-digit";
    }
    if (dateFormat.includes("d")) {
      options.day = "numeric";
    }
    if (dateFormat.includes("yyyy")) {
      options.year = "numeric";
    } else if (dateFormat.includes("yy")) {
      options.year = "2-digit";
    }
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
      <div className="space-y-4">
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
          />
        </Card>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              <Plus className="mr-0.5 size-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedEvent ? "Edit Event" : "Add New Event"}
              </DialogTitle>
            </DialogHeader>
            <EventForm
              event={selectedEvent}
              selectedDate={date}
              onEventSaved={handleEventSaved}
              onCancel={() => {
                setIsDialogOpen(false);
                setSelectedEvent(undefined);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Events for {formatCalendarDate(date)}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="size-6 animate-spin" />
            </div>
          ) : (
            <EventList
              events={events}
              onEditEvent={handleEditEvent}
              onDeleteEvent={handleDeleteEvent}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
