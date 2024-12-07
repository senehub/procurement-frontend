import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

type Props = {
  children: ReactNode;
};

export function AuthenticationProvider(props: Props) {
  return <ClerkProvider>{props.children}</ClerkProvider>;
}
