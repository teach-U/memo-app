"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState, useTransition } from "react";
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
import { getUsers } from "@/lib/actions/user";
import { UserType } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";

import { LayoutWrapperContext } from "../components/layout-wrapper";

export default function SignInPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isPending, startTransition] = useTransition();
  const { setIsLoggedIn } = useContext(LayoutWrapperContext)!;

  const router = useRouter();

  useEffect(() => {
    startTransition(async () => {
      const users = await getUsers();
      setUsers(users);
    });
  }, []);

  const formSchema = z.object({
    username: z.enum(
      users.map((user: UserType) => user.name),
      "That name doesn’t exist."
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const user = users.filter(
      (user: UserType) => user.name === values.username
    )[0];

    setIsLoggedIn(true);
    router.push(`/${user.id}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-3">
      <Form {...form}>
        <form
          className="flex flex-col items-center justify-center space-y-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="username"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter your username in this app.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={isPending ? "outline" : "default"}
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Sign in"}
          </Button>
        </form>
      </Form>
      <Button variant="secondary" onClick={() => router.push("/")}>
        Cancel
      </Button>
    </div>
  );
}
