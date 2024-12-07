import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import PageHeader from "@/components/page-header";
import PageContent from "@/components/page-content";

export default function ProcurementPage() {
  return (
    <PageLayout>
      <PageHeader heading="Procurement Approval Management" />
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Requisition Approval</CardTitle>
              <CardDescription>
                Manage requisition approvals and track the status of procurement
                requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/procurement/approvals/requisition">
                <Button>View Settings</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  );
}
