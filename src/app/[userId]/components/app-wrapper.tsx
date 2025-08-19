"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { AppSidebar } from "./app-sidebar";
import { useParams } from "next/navigation";
import { MemoType, UserType } from "@/types/type";
import { getAllMemos, getUser } from "../actions";

interface Context {
  user: UserType | null;
  memos: MemoType[];
  setMemos: Dispatch<SetStateAction<MemoType[]>>;
  isPending: boolean;
}

export const AppWrapperContext = createContext<Context | null>(null);

export const AppWrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [memos, setMemos] = useState<MemoType[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const user = await getUser(String(userId));
      setUser(user);
      const memos = await getAllMemos(String(userId));
      setMemos(memos);
    });
  }, [userId]);

  return (
    <AppWrapperContext.Provider value={{user, memos, setMemos, isPending}}>
      <SidebarProvider defaultOpen={true} open={true}>
        <AppSidebar />
        {isPending ? "Loading..." : children}
      </SidebarProvider>
    </AppWrapperContext.Provider>
  );
};
