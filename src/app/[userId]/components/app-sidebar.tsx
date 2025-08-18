"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState, useTransition } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MemoType } from "@/types/type";

import { getAllMemos } from "../actions";
import { AppWrapperContext } from "./app-wrapper";
import { Button } from "@/components/ui/button";

export const AppSidebar = () => {
  const [memos, setMemos] = useState<MemoType[]>([]);
  const [isPending, startTransition] = useTransition();

  const user = useContext(AppWrapperContext);

  const { userId } = useParams();

  useEffect(() => {
    startTransition(async () => {
      const memos = await getAllMemos(String(userId));
      setMemos(memos);
    });
  }, [userId]);

  return (
    <Sidebar className="top-12 h-[clsx(100vw-3rem)]">
      {isPending ? (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Loading...</SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>
      ) : (
        <>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Memos</SidebarGroupLabel>
              <SidebarGroupAction title="create memo">+</SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  {memos.map((memo: MemoType) => (
                    <SidebarMenuItem key={memo.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/${userId}/${memo.id}`}>{memo.title}</Link>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>
                        {String(memo.createAt)}
                      </SidebarMenuBadge>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button>{user?.name}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <span>{user?.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>{user?.id}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </>
      )}
    </Sidebar>
  );
};
