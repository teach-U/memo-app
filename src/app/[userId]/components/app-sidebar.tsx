"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";

import { Button } from "@/components/ui/button";
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
import { deleteUser } from "@/lib/actions/user";
import { MemoType } from "@/types/type";

import { AddMemoForm } from "./add-memo-form";
import { AppWrapperContext } from "./app-wrapper";
import { deleteMemo } from "@/lib/actions/memo";

export const AppSidebar = () => {
  const { user, memos, isPending } = useContext(AppWrapperContext)!;

  const { userId } = useParams();

  const router = useRouter();

  const handleDelete = async () => {
    memos.map(async (memo: MemoType) => await deleteMemo(memo.id));
    await deleteUser(String(userId));

    router.push("/");
  };

  return (
    <Sidebar className="top-12 h-[calc(100vh-3rem)]">
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
                    <DropdownMenuItem asChild>
                      <Button onClick={handleDelete}>Delete Account</Button>
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
