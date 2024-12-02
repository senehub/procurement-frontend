import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from "@/components/page-layout";
import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";

export default function OrganizationPage() {
  return (
    <PageLayout>
      <PageHeader heading="Organization" />
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Staffs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage organization staff</p>
              <Link href="/organization/staffs">
                <Button>View Staffs</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Units</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage organizational units</p>
              <Link href="/organization/units">
                <Button>View Units</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Manage departments</p>
              <Link href="/organization/departments">
                <Button>View Departments</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Annual Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">View and manage annual plans</p>
              <Link href="/organization/annual_plans">
                <Button>View Annual Plans</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  );
}
