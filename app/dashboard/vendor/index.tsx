import PageLayout from "@/components/page-layout";
import { AccountOverview } from "./components/account-overwiew";
import { ActiveProcurements } from "./components/active-procurements";
import { QuickActions } from "./components/quick-actions";
import { RecentNotifications } from "./components/recent-notifications";
import { UpcomingOpportunities } from "./components/upcoming-opportunities";
import PageContent from "@/components/page-content";
import DB from "@/lib/db/conn";

type Props = {
  userId: string;
};

export default async function SupplierDashboard(props: Props) {
  const vendor = (await DB.query.Supplier.findFirst({
    where(fields, operators) {
      return operators.eq(fields.userId, props.userId);
    },
  }))!;

  return (
    <PageLayout hideBreadcrums>
      <PageContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full lg:col-span-2">
            <AccountOverview status={vendor.status} />
          </div>
          <div className="lg:row-span-3 space-y-4">
            <QuickActions />
            <RecentNotifications />
          </div>
          <div className="col-span-full lg:col-span-2">
            <ActiveProcurements />
          </div>
          <div className="col-span-full lg:col-span-2">
            <UpcomingOpportunities />
          </div>
          <div className="col-span-full">{/* <RecentNotifications /> */}</div>
        </div>
      </PageContent>
    </PageLayout>
  );
}
