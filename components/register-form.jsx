"use client";
import * as React from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUserSchema } from "@/utils/schema";
import { signUpUser } from "@/app/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function RegisterForm() {
  const [error, setError] = React.useState("");
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(createUserSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler = (values) => {
    startTransition(async () => {
      const result = await signUpUser({
        data: values,
        emailRedirectTo: `${location.origin}/auth/callback`,
      });
      const { error } = JSON.parse(result);
      if (error?.message) {
        toast.error(error.message);
        console.log("Error message", error.message);
        reset({ password: "" });
        return;
      }

      setError("");
      toast.success("registered successfully");
      router.push("/sign-in");
    });
  };

  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-2">
      {error && (
        <p className="mb-6 rounded bg-destructive/80 py-4 text-center">
          {error}
        </p>
      )}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input {...register("name")} placeholder="Name" className="w-full" />
        {errors["name"] && (
          <span className="block pt-1 text-xs text-destructive">
            {errors["name"]?.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          {...register("email")}
          placeholder="Email address"
          className="w-full"
        />
        {errors["email"] && (
          <span className="block pt-1 text-xs text-destructive">
            {errors["email"]?.message}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="w-full"
        />
        {errors["password"] && (
          <span className="block pt-1 text-xs text-destructive">
            {errors["password"]?.message}
          </span>
        )}
      </div>
      <div className="space-y-2 pb-2">
        <Label htmlFor="passwordConfirm">Confirm Password</Label>
        <Input
          type="password"
          {...register("passwordConfirm")}
          placeholder="Confirm Password"
          className="w-full"
        />
        {errors["passwordConfirm"] && (
          <span className="block pt-1 text-xs text-destructive">
            {errors["passwordConfirm"]?.message}
          </span>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Sign up"}
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
