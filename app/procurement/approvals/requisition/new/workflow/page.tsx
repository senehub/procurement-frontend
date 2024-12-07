import PageLayout from "@/components/page-layout";
import PageContent from "@/components/page-content";
import ApprovalWorkflowForm from "./ApprovalWorkflowForm";

export default function CreateWorkflowPage() {
  return (
    <PageLayout>
      <PageContent className="!mt-0 !pt-0">
        <ApprovalWorkflowForm />
      </PageContent>
    </PageLayout>
  );
}
