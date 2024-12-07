import PageLayout from "@/components/page-layout";
import PageContent from "@/components/page-content";
import ApprovalStepForm from "./ApprovalStepForm";

export default function CreateApprovalStepPage() {
  return (
    <PageLayout>
      <PageContent className="!mt-0 !pt-0">
        <ApprovalStepForm />
      </PageContent>
    </PageLayout>
  );
}
