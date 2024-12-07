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
      <PageHeader
        heading="Procurement"
        actions={[
          <Link key={"/procurement/new"} href="/procurement/new">
            <Button>Create New Procurement</Button>
          </Link>,
        ]}
      />
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Requisitions</CardTitle>
              <CardDescription>Manage procurement requisitions</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/procurement/requisitions">
                <Button>View Requisitions</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contracts</CardTitle>
              <CardDescription> Manage procurement contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/procurement/contracts">
                <Button>View Contracts</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription> Manage procurement invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/procurement/invoices">
                <Button>View Invoices</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Approval Managament</CardTitle>
              <CardDescription>
                Manage the approval process for procurement requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/procurement/approvals/">
                <Button>Manage Approval</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  );
}
