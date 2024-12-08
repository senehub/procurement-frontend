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
import { useMemo } from "react";

export default function PageBreadcrumb() {
  const pathname = usePathname();

  const segments = useMemo(() => {
    const links = pathname
      .split("/")
      .filter(Boolean)
      .map((link) => ({
        id: Date.now(),
        href: link,
      }));
    return links;
  }, [pathname]);

  const dropdownSegments = useMemo(() => {
    if (segments.length > 3) return segments.slice(0, segments.length - 3);
    return [];
  }, [segments]);

  if (segments.length < 1) return <div className="h-[25px] items-end" />;

  return (
    <Breadcrumb className="">
      <BreadcrumbList className="h-[25px] items-end text-xs">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        {dropdownSegments.length > 0 && (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-0 flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-full w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="grid">
                  {dropdownSegments.map((segment, index) => {
                    const href = segments
                      .slice(0, index + 1)
                      .reduce((a, c) => {
                        a.push(c.href);
                        return a;
                      }, [] as string[])
                      .join("/");

                    return (
                      <DropdownMenuItem
                        key={`${index}-${segment.id}`}
                        className="capitalize"
                        style={{
                          order: `${dropdownSegments.length - index + 1}`,
                        }}
                      >
                        <BreadcrumbLink
                          className="capitalize"
                          href={`/${href}`}
                        >
                          {segment.href.charAt(0).toUpperCase() +
                            segment.href.slice(1)}
                        </BreadcrumbLink>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
          </>
        )}
        {segments
          .slice(dropdownSegments.length, segments.length - 1)
          .map((segment, index) => {
            const href = segments
              .slice(0, index + dropdownSegments.length + 1)
              .reduce((a, c) => {
                a.push(c.href);
                return a;
              }, [] as string[])
              .join("/");

            return (
              <>
                <BreadcrumbItem key={`${index}-${segment.id}`}>
                  <BreadcrumbLink className="capitalize" href={`/${href}`}>
                    {segment.href.charAt(0).toUpperCase() +
                      segment.href.slice(1)}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!!segments[index + 1] && (
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                )}
              </>
            );
          })}
        <BreadcrumbItem className="min-h-4">
          <BreadcrumbPage className="capitalize text-sm">
            {segments.at(-1)?.href.charAt(0).toUpperCase()}
            {segments.at(-1)?.href.slice(1)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
