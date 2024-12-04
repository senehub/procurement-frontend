import { PageProps } from "@/lib/types";
import { redirect } from "next/navigation";

import { getUnitUpdateData } from "../../page.actions";
import UnitForm from "../../new/UnitForm";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";

export default async function Page(props: PageProps) {
  const unitId = props.params.id;

  if (!unitId) {
    return redirect("/organization/units");
  }

  const unit = await getUnitUpdateData(unitId);

  if (!unit) {
    return redirect("/organization/units");
  }
  return (
    <PageLayout>
      <PageContent className="!pt- !mt-0">
        <Card className="max-w-xl mx-auto bg-card/30 divide-y">
          <CardHeader>
            <CardTitle>Updated Unit Info</CardTitle>
            <CardDescription>Edit the details of the unit.</CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <UnitForm defaultValues={unit} unitId={unitId} />
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  );
}
