"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export const LayoutWrapperContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export const LayoutWrapper = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <LayoutWrapperContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LayoutWrapperContext.Provider>
  );
};
