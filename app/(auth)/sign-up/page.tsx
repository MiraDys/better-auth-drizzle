"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import AuthCard from "../../_components/auth-card";
import { Handshake } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { toast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters long",
      })
      .max(20, {
        message: "Name must be less than 20 characters long",
      }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    await authClient.signUp.email(
      {
        email: values.email,
        password: values.password,
        name: values.name,
      },
      {
        onRequest: (ctx) => {
          console.log("On request, sending values:", ctx);
          toast({
            title: "Hang on ...",
            description: "For just a moment. You are being registered.",
          });
        },
        onSuccess: (ctx) => {
          console.log(ctx);
          form.reset();
          toast({
            title: "Success",
            description: "Welcome to the app!",
          });
        },
        onError: (ctx) => {
          toast({ title: ctx.error.message, variant: "destructive" });
          form.setError("email", {
            type: "manual",
            message: ctx.error.message,
          });
        },
      }
    );
  }

  const footerContent = (
    <p className="text-sm text-muted-foreground">
      I already have an account.{" "}
      <Link href="/sign-in" className="text-primary hover:underline">
        Sign In
      </Link>
    </p>
  );

  return (
    <AuthCard cardTitle="Sign Up" icon={Handshake} footer={footerContent}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a strong password. Min 8 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </AuthCard>
  );
}
