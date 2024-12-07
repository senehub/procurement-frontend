import PageLayout from "@/components/page-layout";
import PageContent from "@/components/page-content";
import StaffForm from "./RequisitionForm";

export default function Page() {
  return (
    <PageLayout>
      {/* <PageHeader heading="Create New Requisition" /> */}
      <PageContent className="!pt- !mt-0">
        <StaffForm />
      </PageContent>
    </PageLayout>
  );
}
