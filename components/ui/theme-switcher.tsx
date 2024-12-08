"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button, buttonVariants } from "./button";
import { LaptopIcon, MoonStar, SunIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      setLoaded(true);
    }
  }, [resolvedTheme]);

  if (!loaded) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span
          className={cn(
            "rounded",
            ...buttonVariants({
              variant: "ghost",
              size: "sm",
            })
          )}
        >
          {resolvedTheme === "light" && <MoonStar />}
          {resolvedTheme === "dark" && <SunIcon />}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup className="space-y-1.5">
          <DropdownMenuItem asChild>
            <Button
              size={"sm"}
              onClick={() => setTheme("dark")}
              variant={resolvedTheme === "dark" ? "secondary" : "ghost"}
              className="flex w-full text-left justify-start items-center gap-2"
            >
              <span className="min-w-6">
                <MoonStar />
              </span>{" "}
              Dark Mood
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              size={"sm"}
              onClick={() => setTheme("light")}
              variant={resolvedTheme === "light" ? "secondary" : "ghost"}
              className="flex w-full text-left justify-start items-center gap-2"
            >
              <span className="min-w-6">
                <SunIcon />
              </span>{" "}
              Light Mood
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              size={"sm"}
              onClick={() => setTheme("system")}
              variant={resolvedTheme === "system" ? "secondary" : "ghost"}
              className="flex w-full text-left justify-start items-center gap-2"
            >
              <span className="min-w-6">
                <LaptopIcon />
              </span>{" "}
              System Pref
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
