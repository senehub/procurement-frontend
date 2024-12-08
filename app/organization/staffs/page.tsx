import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StaffPage from "./page.client";

export default async function page() {
  return (
    <PageLayout>
      <PageHeader
        heading="Staffs"
        actions={[
          <Link key={"new"} href={"/organization/staffs/new"}>
            <Button>Add New Staff</Button>
          </Link>,
        ]}
      />
      <PageContent>
        <StaffPage />
      </PageContent>
    </PageLayout>
  );
}
