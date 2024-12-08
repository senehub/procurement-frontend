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
import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";

export default function OrganizationPage() {
  return (
    <PageLayout>
      <PageHeader heading="Organization" />
      <PageContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Staffs</CardTitle>
              <CardDescription>Manage organization staff</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/organization/staffs">
                <Button>View Staffs</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Units</CardTitle>
              <CardDescription>Manage organizational units</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/organization/units">
                <Button>View Units</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
              <CardDescription>Manage departments</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/organization/departments">
                <Button>View Departments</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Annual Plans</CardTitle>
              <CardDescription>View and manage annual plans</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/organization/annual_plans">
                <Button>View Annual Plans</Button>
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Invite Suppliers</CardTitle>
              <CardDescription>
                Invite suppliers to participate in the procurement process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/suppliers/invitations">
                <Button>Invite Suppliers</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  );
}
