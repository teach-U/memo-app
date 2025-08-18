import { ReactNode } from "react";

import { AppWrapper } from "./components/app-wrapper";

export default function UserPageLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main>
      <AppWrapper>{children}</AppWrapper>
    </main>
  );
}
