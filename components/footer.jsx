import { Github } from "lucide-react";
import ThemeSwitch from "./theme-switch";
import TimeDisplay from "./time-display";

export default function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="mx-auto flex max-w-7xl flex-row items-center justify-between px-3 py-6 sm:px-4 md:py-8 lg:px-8">
        <div className="flex flex-row items-center gap-2">
          <a
            href="https://github.com/egarrisxn/xprod"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">GitHub</span>
            <Github className="size-5" />
          </a>
          <p className="text-muted-foreground">
            {" "}
            EG | {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 text-muted-foreground">
          <TimeDisplay />
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}
