import { PageProps } from "@/lib/types";
import { redirect } from "next/navigation";

import { getDepartmentUpdateData } from "../../page.actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import DepartmentForm from "../../new/DepartmentForm";

export default async function Page(props: PageProps) {
  const departmentId = (await props.params).id;

  if (!departmentId) {
    return redirect("/organization/departments");
  }

  const department = await getDepartmentUpdateData(departmentId);

  if (!department) {
    return redirect("/organization/departments");
  }
  return (
    <PageLayout>
      <PageContent className="!pt- !mt-0">
        <Card className="max-w-xl mx-auto bg-card/30 divide-y">
          <CardHeader>
            <CardTitle>Updated Department Info</CardTitle>
            <CardDescription>
              Edit the details of the department.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <DepartmentForm
              defaultValues={department}
              departmentId={departmentId}
            />
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  );
}
