"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext } from "react";

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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MemoType } from "@/types/type";

import { AddMemoForm } from "./add-memo-form";
import { AppWrapperContext } from "./app-wrapper";

export const AppSidebar = () => {
  const { user, memos, isPending } = useContext(AppWrapperContext)!;

  const { userId } = useParams();

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
              <AddMemoForm />
              <SidebarGroupContent>
                <SidebarMenu>
                  {memos.map((memo: MemoType) => (
                    <SidebarMenuItem key={memo.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/${userId}/${memo.id}`}>{memo.title}</Link>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>
                        {`${memo.createAt.getMonth()}/${memo.createAt.getDate()}`}
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
                    <SidebarMenuButton className="text-2xl">
                      {user?.name}
                    </SidebarMenuButton>
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
