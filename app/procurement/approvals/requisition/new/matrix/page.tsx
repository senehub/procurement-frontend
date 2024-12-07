import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";

import ApprovalMatrixForm from "./ApprovalMatrixForm";

export default function CreateApprovalMatrixPage() {
  return (
    <PageLayout>
      <PageContent className="!mt-0 !pt-0">
        <ApprovalMatrixForm />
      </PageContent>
    </PageLayout>
  );
}
