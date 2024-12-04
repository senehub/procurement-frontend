"use client";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function ActionButton({
  children,
  disabled,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button {...props} disabled={disabled || pending}>
      <span className={cn("transition-all", pending && "opacity-0")}>
        {children}
      </span>
      {pending && <Loader2 className="animate-spin" />}
    </Button>
  );
}
