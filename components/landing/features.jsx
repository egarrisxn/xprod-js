import { CalendarDays, CheckSquare, FileText } from "lucide-react";

const features = [
  {
    name: "Smart Calendar",
    description:
      "Intelligent scheduling with customizable views and event management.",
    icon: CalendarDays,
  },
  {
    name: "Task Management",
    description:
      "Organize your tasks with priority levels, due dates, and progress tracking.",
    icon: CheckSquare,
  },
  {
    name: "Notes & Documents",
    description:
      "Create, edit, and organize your notes with rich text formatting.",
    icon: FileText,
  },
];

export default function Features() {
  return (
    <section id="features" className="pt-14 xl:pt-24">
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-indigo-500">
            Everything You Need
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            All Your Productivity Tools in One Place
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Seamlessly integrate your calendar, tasks, and notes into a single,
            powerful workspace.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-500"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
