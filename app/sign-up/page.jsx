import Link from "next/link";
import RegisterForm from "@/components/auth/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Sign Up!",
};

export default function SignUpPage() {
  return (
    <section className="grid place-items-center px-3 xs:px-4 sm:px-6 2xl:px-0 py-16">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-4xl">Welcome in!</CardTitle>
          <CardDescription>
            Sign up below to continue.
            <br />
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="underline-offset-2 text-card-foreground hover:underline focus:text-accent-foreground hover:text-accent-foreground"
            >
              Sign in!
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </section>
  );
}
