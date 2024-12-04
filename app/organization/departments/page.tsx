import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DepartmentPage from "./page.client";

export default function page() {
  return (
    <PageLayout>
      <PageHeader
        heading="Departments"
        actions={[
          <Link key={"new"} href={"/organization/departments/new"}>
            <Button>Add New Department</Button>
          </Link>,
        ]}
      />
      <PageContent>
        <DepartmentPage />
      </PageContent>
    </PageLayout>
  );
}
