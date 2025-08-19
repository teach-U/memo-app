import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import { MemoType } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";

import { getAllMemos } from "../../actions";
import { AppWrapperContext } from "../../components/app-wrapper";
import { deleteMemo, updateMemo } from "../action";

export const EditForm = () => {
  const { userId, memoId } = useParams();

  const { memos, setMemos } = useContext(AppWrapperContext)!;

  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(1, "Please enter memo title"),
    content: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    const memo = memos.find((memo: MemoType) => memo.id === memoId);
    if (memo) {
      form.reset({
        title: memo.title,
        content: memo.content ?? "",
      });
    }
  }, [memos, memoId, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateMemo(String(memoId), values.title, values.content);

    const memos = await getAllMemos(String(userId));
    setMemos(memos);
  };

  const handleDelete = async () => {
    await deleteMemo(String(memoId));

    const memos = await getAllMemos(String(userId));
    setMemos(memos);

    router.push(`/${userId}`)
  };

  return (
    <div className="flex flex-col w-[calc(100vw-16rem)] h-[calc(100vw-3rem)] p-2 space-y-3">
      <Form {...form}>
        <form
          className="flex flex-col space-y-2.5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white w-full"
                    placeholder="memo title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-white w-full h-96"
                    placeholder="memo content"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
      <div>
        <Button className="w-full" variant="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
