"use client";
import * as React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/auth";
import { loginUserSchema } from "@/utils/schema";
import { loginWithGoogle, loginWithGitHub } from "@/utils/oauth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function LoginForm() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(loginUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = methods;

  const onSubmitHandler = async (values) => {
    startTransition(async () => {
      try {
        await toast.promise(signInUser(values), {
          loading: "Signing in...",
          success: "Successfully logged in!",
          error: (err) => err.message || "Login failed",
        });

        router.push("/dashboard");
      } catch (error) {
        const errorMessage =
          typeof error === "string"
            ? error
            : error?.message || "An unexpected error occurred";

        console.error("Error message:", errorMessage);
        setError("email", { type: "manual", message: errorMessage });
        setError("password", { type: "manual", message: errorMessage });
        reset({ password: "" });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-2">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          {...register("email")}
          placeholder="your@email.com"
          className="w-full"
        />
        {errors.email && (
          <span className="block pt-1 text-xs text-destructive">
            {errors.email.message}
          </span>
        )}
      </div>
      <div className="space-y-2 pb-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          {...register("password")}
          placeholder="************"
          className="w-full"
        />
        {errors.password && (
          <span className="block pt-1 text-xs text-destructive">
            {errors.password.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
      <div className="relative pt-2">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={loginWithGoogle}
          className=" bg-white text-black dark:hover:bg-slate-300 dark:hover:text-black"
        >
          <Image src="/icons/google.svg" alt="Google" width={20} height={20} />{" "}
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={loginWithGitHub}
          className=" bg-white text-black dark:hover:bg-slate-300 dark:hover:text-black"
        >
          <Image src="/icons/github.svg" alt="GitHub" width={20} height={20} />{" "}
          Github
        </Button>
      </div>
    </form>
  );
}
