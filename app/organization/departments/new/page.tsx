import PageLayout from "@/components/page-layout";
import PageContent from "@/components/page-content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DepartmentForm from "./DepartmentForm";

export default function Page() {
  return (
    <PageLayout>
      <PageContent className="!pt- !mt-0">
        <Card className="max-w-xl mx-auto bg-card/30 divide-y">
          <CardHeader>
            <CardTitle>Add New Department</CardTitle>
            <CardDescription>
              Enter the details of the new department.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <DepartmentForm />
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  );
}
