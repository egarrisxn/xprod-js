import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote as QuoteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import quotes from "../../utils/xquotes.json";

export default function ProfileCard({ user }) {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="mx-auto mb-16 flex max-w-4xl flex-col items-center justify-center gap-8 px-2 sm:rounded-lg sm:border sm:bg-card sm:px-8 sm:py-12 sm:shadow-lg dark:border-foreground">
      <div className="mx-auto max-w-40 rounded-full">
        {user.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt="User Avatar"
            width={160}
            height={160}
            className="rounded-full aspect-square"
          />
        ) : (
          <Image
            src="/avatars/user.png"
            alt="Fallback Avatar"
            width={160}
            height={160}
            className="rounded-full aspect-square"
          />
        )}
      </div>
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold sm:text-5xl">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {user.email?.split("@")[0] || "User"}
          </span>
        </h1>
        <p className="text-muted-foreground sm:text-lg">
          Ready to boost your productivity today?
        </p>
      </div>
      <Card className="border-2 border-muted">
        <CardContent className="pt-5 sm:pt-6">
          <div className="flex gap-3 sm:gap-4">
            <QuoteIcon className="size-6 flex-shrink-0 text-indigo-500 sm:size-8" />
            <div className="space-y-1 sm:space-y-2">
              <p className="italic sm:text-lg">{randomQuote.content}</p>
              <p className="text-sm text-muted-foreground">
                ― {randomQuote.author}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-center gap-3 sm:gap-4">
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            Go to Dashboard
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
        <Button asChild variant="outline" size="lg">
          <Link href="/profile/edit">Edit Profile</Link>
        </Button>
      </div>
    </div>
  );
}
