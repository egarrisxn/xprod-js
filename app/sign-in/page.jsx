import Link from "next/link";
import LoginForm from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Sign In!",
};

export default function SignInPage() {
  return (
    <section className="grid place-items-center px-3 xs:px-4 sm:px-6 2xl:px-0 py-16">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-4xl">Welcome back!</CardTitle>
          <CardDescription>
            Sign in below to continue.
            <br />
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="underline-offset-2 text-card-foreground hover:underline focus:text-accent-foreground hover:text-accent-foreground"
            >
              Sign up!
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </section>
  );
}
