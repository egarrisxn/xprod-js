// import PomodoroTimer from "@/components/timer/pomodoro-timer";
// import NoteList from "@/components/notes/note-list";
// import TodoList from "@/components/todos/todo-list";
// import CalendarEvents from "@/components/events/calendar-events";
// import BookmarkList from "@/components/boomarks/bookmark-list";
import HabitTracker from "@/components/habits/habit-tracker";

export default function DashboardPage() {
  return (
    <div className="grid place-items-center px-3 xs:px-4 sm:px-6 2xl:px-0 py-16">
      {/* <PomodoroTimer /> */}
      {/* <NoteList/> */}
      {/* <TodoList /> */}
      {/* <CalendarEvents /> */}
      {/* <BookmarkList /> */}
      <HabitTracker />
    </div>
  );
}
