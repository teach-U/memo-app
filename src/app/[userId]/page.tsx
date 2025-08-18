"use client";

import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { LayoutWrapperContext } from "../components/layout-wrapper";

export default function UserPage() {
  const { userId } = useParams();
  const { setIsLoggedIn } = useContext(LayoutWrapperContext)!;

  useEffect(() => {
    setIsLoggedIn(true);
  }, [setIsLoggedIn]);

  return <div>{userId}</div>;
}
