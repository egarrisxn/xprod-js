"use client";
import * as React from "react";
import { addHabit } from "@/app/actions/habit";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddHabit() {
  const [habitName, setHabitName] = React.useState("");
  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleAddHabit = async () => {
    if (!habitName) return;
    try {
      await addHabit(habitName);
      setHabitName("");
      setOpen(false);
    } catch (err) {
      setError("Failed to add habit");
      console.error(err);
    }
  };

  return (
    <div>
      <Button
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        onClick={() => setOpen(true)}
      >
        Add Habit
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a New Habit</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            id="habit"
            name="habit"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            className="w-full rounded-md border p-2"
            placeholder="Enter habit name"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          <DialogFooter>
            <Button onClick={handleAddHabit}>Save Habit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
