import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import RequisitionPage from "./page.client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <PageLayout>
      <PageHeader
        heading="Requisitions"
        actions={[
          <Link key={"new"} href={`/procurement/requisitions/new`}>
            <Button>Add New Requisition</Button>
          </Link>,
        ]}
      />
      <PageContent>
        <RequisitionPage />
      </PageContent>
    </PageLayout>
  );
}
