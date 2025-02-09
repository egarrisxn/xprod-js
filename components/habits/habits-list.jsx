"use client";
import * as React from "react";
import { Trash2 } from "lucide-react";
import { deleteHabit, logHabitDay, unlogHabitDay } from "@/app/actions/habit";
import {
  calculateStreak,
  groupDaysByMonth,
  getLast365Days,
} from "@/utils/helpers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HabitsList({ habits: initialHabits }) {
  const [habits, setHabits] = React.useState(initialHabits);
  const last365Days = React.useMemo(() => getLast365Days(), []);
  const groupedDays = React.useMemo(
    () => groupDaysByMonth(last365Days),
    [last365Days]
  );

  const toggleDay = async (habitId, day) => {
    try {
      const habit = habits.find((h) => h.id === habitId);
      if (!habit) return;

      const isCompleted = habit.completed.includes(day);
      const updatedCompleted = isCompleted
        ? await unlogHabitDay(habitId, day)
        : await logHabitDay(habitId, day);

      if (updatedCompleted) {
        const streak = calculateStreak(updatedCompleted);
        setHabits((prevHabits) =>
          prevHabits.map((h) =>
            h.id === habitId ? { ...h, completed: updatedCompleted, streak } : h
          )
        );
      }
    } catch (error) {
      console.error("Error updating habit log:", error);
    }
  };

  const getToday = (day) => day === new Date().toISOString().split("T")[0];

  return (
    <div className="grid grid-cols-1 gap-6">
      {habits.map((habit) => (
        <Card key={habit.id}>
          <CardHeader className="pb-5">
            <div className="flex items-center justify-between gap-2 sm:gap-0">
              <div className="flex flex-row flex-wrap items-center gap-1.5">
                <CardTitle>{habit.name}</CardTitle>
                <Badge className="rounded-md border-none px-1.5 tracking-tighter">
                  {habit.streak} DAY STREAK
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-4 text-red-400"
                onClick={async () => {
                  await deleteHabit(habit.id);
                  setHabits((prev) => prev.filter((h) => h.id !== habit.id));
                }}
              >
                <Trash2 className="size-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="w-full">
            {Object.entries(groupedDays).map(([month, days]) => (
              <div
                key={month}
                className="flex flex-row flex-wrap items-center gap-1"
              >
                <div className="w-full max-w-12 text-sm font-medium tracking-tighter">
                  {month}
                </div>
                <div className="flex flex-row flex-wrap gap-1">
                  {days.map((day) => (
                    <div
                      key={day}
                      className={`size-4 cursor-pointer rounded ${
                        habit.completed.includes(day)
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                          : "bg-slate-600"
                      } ${getToday(day) ? "border border-foreground" : ""}`}
                      onClick={() => toggleDay(habit.id, day)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
