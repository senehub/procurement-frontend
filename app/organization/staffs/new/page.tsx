import PageLayout from "@/components/page-layout";
import PageContent from "@/components/page-content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StaffForm from "./StaffForm";

export default function Page() {
  return (
    <PageLayout>
      <PageContent className="!pt- !mt-0">
        <Card className="max-w-xl mx-auto bg-card/30 divide-y">
          <CardHeader>
            <CardTitle>Add New Staff</CardTitle>
            <CardDescription>
              Enter the details of the new staff.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5">
            <StaffForm />
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  );
}
