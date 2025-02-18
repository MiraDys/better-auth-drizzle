"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthCard from "./auth-card";
import { LogIn } from "lucide-react";

import { z } from "zod";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import SignInPasskey from "./sign-in-passkey";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function SignInForm() {
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          console.log(ctx);
          toast({
            title: "Hang on ...Signing you in",
          });
        },
        onSuccess: (ctx) => {
          console.log(ctx);
          toast({
            title: "Success",
            description: "Welcome to the app!",
          });
        },
        onError: (ctx) => {
          console.log(ctx);
          toast({
            title: "Error",
            description: "Failed to sign in",
          });
        },
      }
    );
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const footerContent = (
    <p className="text-sm text-muted-foreground">
      Shoot, I don't have an account yet... <br />
      <Link href="/sign-up" className="text-primary hover:underline">
        Sign up
      </Link>
    </p>
  );

  return (
    <AuthCard cardTitle="Sign In" icon={LogIn} footer={footerContent}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4 items-end">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </Form>
      <Separator className="my-4" />
      <SignInPasskey />
    </AuthCard>
  );
}
