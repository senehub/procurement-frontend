import { PageProps } from "@/lib/types";
import { redirect } from "next/navigation";

import { getRequisitionUpdateData } from "../../page.actions";
import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import RequisitionForm from "../../new/RequisitionForm";

export default async function Page(props: PageProps) {
  const requisitionId = (await props.params).id;

  if (!requisitionId) {
    return redirect("/organization/staffs");
  }

  const requisition = await getRequisitionUpdateData(requisitionId);

  if (!requisition) {
    return redirect("/organization/requisitions");
  }
  return (
    <PageLayout>
      <PageContent className="!pt- !mt-0">
        <RequisitionForm
          defaultValues={requisition}
          requisitionId={requisitionId}
        />
      </PageContent>
    </PageLayout>
  );
}
