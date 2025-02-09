import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="w-full bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-3 xs:px-4 sm:px-6 py-24 sm:gap-4 sm:py-40 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="py-1 text-4xl font-bold tracking-tight sm:text-6xl">
            Start your day with reason and purpose!
          </p>
          <p className="mt-4 xs:text-lg leading-8 text-muted-foreground sm:mt-6 lg:mx-4">
            No more reaching for an array of applications to keep your day in
            order. Everything you need is right here! We got you covered, so
            what are you waiting for?!
          </p>
          <div className="mt-6 flex items-center justify-center sm:mt-10">
            <Button
              asChild
              size="md"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              <Link href="/sign-up">Sign Up Now!</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
