"use client";
import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Page() {
  const { resolvedTheme } = useTheme();
  return (
    <div className="min-h-screen w-full p-5 flex justify-center mt-[15svh]">
      <SignIn
        appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
      />
    </div>
  );
}
