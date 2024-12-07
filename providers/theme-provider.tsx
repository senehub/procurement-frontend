import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type Props = {
  children: ReactNode;
};

export default function AppThemeProvider({ children }: Props) {
  return (
    <ThemeProvider
      defaultTheme="light"
      enableColorScheme
      enableSystem
      themes={["dark", "light", "system"]}
      storageKey="_T"
      attribute="class"
    >
      {children}
    </ThemeProvider>
  );
}
