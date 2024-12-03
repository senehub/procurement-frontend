import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import PageHeader from "@/components/page-header";
import PageContent from "@/components/page-content";

export default function ProcurementPage() {
  return (
    <PageLayout>
      <PageHeader
        heading="Procurement"
        actions={[
          <Link key={"/procurement/create"} href="/procurement/create">
            <Button>Create New Procurement</Button>
          </Link>,
        ]}
      />
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Requisitions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage procurement requisitions</p>
              <Link href="/procurement/requisitions">
                <Button>View Requisitions</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage procurement contracts</p>
              <Link href="/procurement/contracts">
                <Button>View Contracts</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage procurement invoices</p>
              <Link href="/procurement/invoices">
                <Button>View Invoices</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  );
}
