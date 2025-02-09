import { getHabits } from "@/app/actions/habit";
import { HabitsCard } from "@/components/habits/habits-card";

export default async function HabitTracker() {
  const habits = await getHabits();
  return <HabitsCard defaultHabits={habits} />;
}
