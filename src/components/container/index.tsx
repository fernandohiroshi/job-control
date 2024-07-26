import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto px-2 w-full max-w-7xl">{children}</div>;
}
