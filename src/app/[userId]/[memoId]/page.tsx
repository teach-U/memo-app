"use client";

import { useContext } from "react";
import { EditForm } from "./components/edit-form";
import { AppWrapperContext } from "../components/app-wrapper";

export default function MemoPage() {
  const { memos } = useContext(AppWrapperContext)!;

  return <div>{memos && <EditForm />}</div>;
}
