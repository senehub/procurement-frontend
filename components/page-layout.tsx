import { ReactNode } from "react";
import PageBreadcrumb from "./page-breadcrums";

type Props = {
  children: ReactNode;
};

export default function PageLayout({ children }: Props) {
  return (
    <>
      <div className="laptop:px-6 sm:px-4 px-2 xl:container xl:mx-auto">
        <PageBreadcrumb />
      </div>
      <main className="laptop:p-6 min-h-[69.5svh] sm:p-4 p-2 xl:container pt-4 lg:pt-6 xl:mx-auto xl:pt-10">
        {children}
      </main>
    </>
  );
}
