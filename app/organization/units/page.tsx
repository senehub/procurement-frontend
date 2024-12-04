import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UnitPage from "./page.client";

export default function page() {
  return (
    <PageLayout>
      <PageHeader
        heading="Units"
        actions={[
          <Link key={"new"} href={"/organization/units/new"}>
            <Button>Add New Unit</Button>
          </Link>,
        ]}
      />
      <PageContent>
        <UnitPage />
      </PageContent>
    </PageLayout>
  );
}
