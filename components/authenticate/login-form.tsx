"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AuthCard from "./auth-card";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import FormError from "./form-error";
import { loginSchema } from "@/types/login-schema";
import { LoginAccount } from "@/server/actions/login";
export default function LoginForm() {

  const [error, setError] = useState<string | null>('')

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute } = useAction(LoginAccount, {
    onSuccess(data){
        setError(data.data?.error || null)
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    execute(values);
    setError("");
  };

  return (
    <>
      <AuthCard
        title="Wecloome Back!"
        backButtonHref="/register"
        backButtonLabel="Don't have an account?"
      >
        <div>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@doe.com"
                        {...field}
                        type="email"
                        autoComplete="email"
                      />
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
                      <Input
                        placeholder="xxxxxxxx"
                        {...field}
                        type="password"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error || ""} />
            </div>
            <Button type="submit" className="w-full mt-6">Submit</Button>
          </form>
        </Form>
      </div>
    </AuthCard>
    </>
  );
}
