"use client";

import { ActiveProcurements } from "./components/activie-procurements";
import { QuickActions } from "./components/quick-actions";
import { KPIOverview } from "./components/kpi-overview";
import { PendingApprovals } from "./components/pending-approvals";
import { ProcurementSpendChart } from "./components/procurement-spend-chart";
import { RecentSupplierActivity } from "./components/recent-supplier-activity";
import PageLayout from "@/components/page-layout";
import PageContent from "@/components/page-content";

type Props = {
  userId?: string;
};

export default function StaffDashboard(props: Props) {
  console.log(props);
  return (
    <PageLayout hideBreadcrums>
      <PageContent className="!mt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full">
            <KPIOverview />
          </div>
          <div className="lg:col-span-2">
            <ActiveProcurements />
          </div>
          <div className="lg:row-span-2">
            <PendingApprovals />
          </div>
          <div className="lg:col-span-2">
            {" "}
            <ProcurementSpendChart />
          </div>
          <div className="lg:col-span-2">
            <RecentSupplierActivity />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
