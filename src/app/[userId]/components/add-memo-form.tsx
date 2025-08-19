import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SidebarMenuAction } from "@/components/ui/sidebar";
import { MemoType } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";

import { addMemo, getAllMemos } from "../actions";

interface Props {
  setMemos: Dispatch<SetStateAction<MemoType[]>>;
}

export const AddMemoForm = ({ setMemos }: Props) => {
  const { userId } = useParams();
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(1, "Please inter memo title"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const newMemo = await addMemo(String(userId), values.title);

      const memos = await getAllMemos(String(userId));
      setMemos(memos);

      router.push(`/${userId}/${newMemo.id}`);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction>+</SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger>+ create a new memo</DialogTrigger>
            <DialogContent className="flex flex-col items-center justify-center space-y-2">
              <DialogHeader>
                <DialogTitle>create a new memo</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  className="flex flex-col items-center justify-center space-y-3"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center justify-center">
                        <FormLabel>Memo Title</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-white"
                            placeholder="memo title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    variant={isPending ? "outline" : "default"}
                    disabled={isPending}
                  >
                    {isPending ? "Creating..." : "Create Memo"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
