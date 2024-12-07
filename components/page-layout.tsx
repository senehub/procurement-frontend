import { ReactNode } from "react";
import PageBreadcrumb from "./page-breadcrums";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  hideBreadcrums?: boolean;
};

export default function PageLayout({ children, ...props }: Props) {
  return (
    <>
      {!props.hideBreadcrums && (
        <div className="laptop:px-6 sm:px-4 px-2 xl:container xl:mx-auto">
          <PageBreadcrumb />
        </div>
      )}
      <main
        className={cn(
          "laptop:p-6 min-h-[calc(100svh-195px)] sm:p-4 p-2 xl:container pt-4 lg:pt-6 xl:mx-auto xl:pt-10"
        )}
      >
        <div className={cn("", props.className)}>{children}</div>
      </main>
    </>
  );
}
