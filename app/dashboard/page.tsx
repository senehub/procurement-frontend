import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, DollarSign, ShoppingCart, Users } from "lucide-react";
import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";

export default function DashboardPage() {
  return (
    <PageLayout>
      {/* <PageHeader heading="Dashboard" /> */}
      <PageContent className="!mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex relative">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground absolute right-2 top-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex relative">
              <CardTitle className="text-sm font-medium">
                Active Procurements
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground absolute right-2 top-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex relative">
              <CardTitle className="text-sm font-medium">
                Total Suppliers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground absolute right-2 top-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last year
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex relative">
              <CardTitle className="text-sm font-medium">
                Savings Rate
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground absolute right-2 top-1" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15.3%</div>
              <p className="text-xs text-muted-foreground">
                +2.4% from last quarter
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span>New RFQ created for office supplies</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Contract signed with Supplier XYZ</span>
                  <span className="text-muted-foreground">1 day ago</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Bid evaluation completed for Project ABC</span>
                  <span className="text-muted-foreground">3 days ago</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button>Create New RFQ</Button>
                <Button>Invite Supplier</Button>
                <Button>View Active Bids</Button>
                <Button>Generate Reports</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContent>
    </PageLayout>
  );
}
