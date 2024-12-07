import React from "react";
import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import ProcurementForm from "./ProcurementForm";

export default function Page() {
  return (
    <PageLayout className="max-w-[1000px] mx-auto">
      <PageHeader heading="New Procurement" />
      <PageContent>
        <ProcurementForm />
      </PageContent>
    </PageLayout>
  );
}
