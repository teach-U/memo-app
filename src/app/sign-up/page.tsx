"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { UserType } from "@/types/type";
import { addUser, getUser } from "./actions";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  useEffect(() => {
    startTransition(async () => {
      const users = await getUser();
      setUsers(users);
    });
  }, []);

  const formSchema = z.object({
    username: z
      .string()
      .min(1, "Please enter username")
      .refine(
        (val) => !users.some((user: UserType) => user.name === val),
        "That username is already in use."
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newUser = await addUser(values.username);

    router.push(`/${newUser.id}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>This is your name in this app.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="outline" disabled={isPending}>
          {isPending ? "Loading..." : "Sign up"}
        </Button>
      </form>
    </Form>
  );
}
