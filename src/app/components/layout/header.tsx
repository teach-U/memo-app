"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MemoIcon } from "../icons/memo-icon";
import { useContext } from "react";
import { LayoutWrapperContext } from "../layout-wrapper";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  const { isLoggedIn, setIsLoggedIn } = useContext(LayoutWrapperContext)!;

  return (
    <div className="flex items-center justify-between p-2 bg-blue-200">
      <div className="flex space-x-2 items-center text-3xl font-bold text-gray-800">
        <MemoIcon size="24" />
        <span>Memo App</span>
      </div>
      {isLoggedIn ? (
        <Button
          variant="ghost"
          onClick={() => {
            setIsLoggedIn(false);
            router.push("/");
          }}
        >
          Sign out
        </Button>
      ) : (
        <div>
          <Button variant="ghost">
            <Link href="sign-in">Sign in</Link>
          </Button>
          <Button variant="ghost">
            <Link href="sign-up">Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
