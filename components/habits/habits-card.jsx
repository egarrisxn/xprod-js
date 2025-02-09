"use client";
import * as React from "react";
import { Activity } from "lucide-react";
import { getHabits } from "@/app/actions/habit";
import { AddHabit } from "./add-habit";
import { HabitsList } from "./habits-list";

export function HabitsCard({ defaultHabits }) {
  const [habits, setHabits] = React.useState(defaultHabits);

  React.useEffect(() => {
    async function fetchHabits() {
      try {
        const data = await getHabits();
        if (Array.isArray(data)) {
          setHabits(data);
        } else {
          console.error("Unexpected data structure from getHabits:", data);
        }
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    }
    if (defaultHabits.length === 0) {
      fetchHabits();
    }
  }, [defaultHabits]);

  return (
    <section className="w-full max-w-4xl p-2">
      <div className="flex w-full flex-col rounded-lg border bg-card p-4 shadow-lg dark:border-foreground">
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-4">
            <Activity className="size-8 text-gray-500 dark:text-gray-400" />
            <h1 className="text-2xl font-semibold">Habit Tracker</h1>
          </div>
          <AddHabit />
        </div>
        <HabitsList habits={habits} />
      </div>
    </section>
  );
}
