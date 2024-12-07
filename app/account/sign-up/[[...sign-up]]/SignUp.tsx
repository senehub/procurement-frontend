"use client";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function ClerkSignUp() {
  const { resolvedTheme } = useTheme();
  return (
    <SignUp
      unsafeMetadata={{
        vendorId: null,
        onBoarded: false,
        userType: "vendor",
        hasDefaultPassword: false,
      }}
      forceRedirectUrl={"/suppliers/onbording"}
      appearance={{ baseTheme: resolvedTheme === "dark" ? dark : undefined }}
    />
  );
}
