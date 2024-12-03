"use client";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slash } from "lucide-react";
import { usePathname } from "next/navigation";

export default function PageBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="">
      <BreadcrumbList className="h-[25px] items-end">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        {segments.length > 2 && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-0 flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-full w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem className="capitalize">
                    Documentation
                  </DropdownMenuItem>
                  <DropdownMenuItem className="capitalize">
                    Themes
                  </DropdownMenuItem>
                  <DropdownMenuItem className="capitalize">
                    GitHub
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </>
        )}
        {segments.slice(0, segments.length - 1).map((segment, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                className="capitalize"
                href={`/${segments.slice(0, index + 1).join("/")}`}
              >
                {segment.charAt(0).toUpperCase() + segment.slice(1)}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {!!segments[index + 1] && (
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
          </>
        ))}
        <BreadcrumbItem className="min-h-4">
          <BreadcrumbPage className="capitalize">
            {segments.at(-1)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
