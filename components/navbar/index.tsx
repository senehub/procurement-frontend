"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LockIcon, LogOutIcon, Menu, Settings } from "lucide-react";

const navItems = [
  {
    title: "Home",
    href: "/dashboard",
  },
  {
    title: "Organization",
    href: "/organization",
  },
  {
    title: "Procurement",
    href: "/procurement",
  },
  // {
  //   title: "Vendors",
  //   href: "/vendors",
  // },
  {
    title: "Suppliers",
    href: "/suppliers",
  },
  {
    title: "Auth Manager",
    href: "/auth-manager",
  },
  {
    title: "About",
    href: "/about",
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-background border-b">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Procure
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded">
                  MT
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[250px]">
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <div className="pb-2">
                      <div className="bg-secondary/30 p-2 w-full">
                        <div className="text-xs  m-b-0.5">Signed in as</div>
                        <div
                          title="Mahammed Touray"
                          className="truncate w-[18ch] text-lg lg:text-xl"
                        >
                          Mahammed Touray
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer hover:bg-secondary/50 rounded-[10px]"
                  >
                    <Link
                      href={"/profile"}
                      className="flex h-10 items-center gap-3"
                    >
                      <Settings />
                      Manage Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer hover:bg-secondary/50 rounded-[10px]"
                  >
                    <Link
                      href={"/account/logout"}
                      className="flex h-10 items-center gap-3"
                    >
                      <LogOutIcon />
                      Sign Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <div className="flex flex-col items-center justify-center h-[50px]">
                  <div className="text-sm text-muted-foreground inline-flex items-center justify-center gap-2">
                    <LockIcon className="w-4 h-4 text-muted-foreground" />{" "}
                    <span>
                      Secured by <strong>SeneHub</strong>
                    </span>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.title} asChild>
                      <Link href={item.href}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
