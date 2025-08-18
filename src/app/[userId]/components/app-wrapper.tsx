"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useTransition,
} from "react";
import { AppSidebar } from "./app-sidebar";
import { useParams } from "next/navigation";
import { UserType } from "@/types/type";
import { getUser } from "../actions";

export const AppWrapperContext = createContext<UserType | null>(null);

export const AppWrapper = ({ children }: Readonly<{ children: ReactNode }>) => {
  const { userId } = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const user = await getUser(String(userId));
      setUser(user);
    });
  }, [userId]);

  return (
    <AppWrapperContext.Provider value={user}>
      <SidebarProvider defaultOpen={true} open={true} >
        <AppSidebar />
        {isPending ? "Loading..." : children}
      </SidebarProvider>
    </AppWrapperContext.Provider>
  );
};
