"use client";

import { useParams } from "next/navigation";

export default function MemoPage() {
  const { userId, memoId } = useParams();

  return (
    <div>
      <div>{userId}</div>
      <div>{memoId}</div>
    </div>
  );
}
