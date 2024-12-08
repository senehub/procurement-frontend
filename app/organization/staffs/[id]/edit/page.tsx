import { PageProps } from "@/lib/types";
import { redirect } from "next/navigation";

import { getStaffUpdateData } from "../../page.actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import StaffForm from "../../new/StaffForm";

export default async function Page(props: PageProps) {
  const staffId = (await props.params).id;

  if (!staffId) {
    return redirect("/organization/staffs");
  }

  const staff = await getStaffUpdateData(staffId);

  if (!staff) {
    return redirect("/organization/staffs");
  }
  return (
    <PageLayout>
      <PageContent className="!pt- !mt-0">
        <Card className="max-w-xl mx-auto bg-card/30 divide-y">
          <CardHeader>
            <CardTitle>Updated Staff Info</CardTitle>
            <CardDescription>Edit the details of the staff.</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <StaffForm defaultValues={staff} staffId={staffId} />
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  );
}
