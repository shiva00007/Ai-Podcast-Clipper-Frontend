"use client";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { signupSchema, type loginFormValues } from "~/schemas/auth";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  //gobal error

  const [error, setError] = useState<string | null>(null);

  const [isSubmiting, setIsSumbiting] = useState(false);

  const router = useRouter();
  //zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSumbit = async (data: loginFormValues) => {
    try {
      setIsSumbiting(true);
      setError(null);

      const signUpResult = await signIn("credentials", {
        email: data.email,
        password: data.passoword,
        redirect: false,
      });

      if (signUpResult?.error) {
        setError("Invalid Email and Password");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An unExpected Error Ocuccr");
    } finally {
      setIsSumbiting(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          {/* <CardDescription>
            Enter your email below to login to your account
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSumbit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-center text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("passoword")}
                />
                {errors.passoword && (
                  <p className="text-center text-sm text-red-500">
                    {errors.passoword.message}
                  </p>
                )}
              </div>
              {error && (
                <p className="rounded-md bg-red-50 text-xl text-red-500">
                  {error}
                </p>
              )}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isSubmiting}>
                  {isSubmiting ? "Signing up..." : "SignUp"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don`&apos;`thave an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
