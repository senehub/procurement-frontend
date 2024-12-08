import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import { lazy, Suspense, use } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { PageProps } from "@/lib/types";

const CreateInvitationLazy = lazy(
  () => import("./invitations/CreateInvitation")
);

const SupplierPageLazy = lazy(() => import("./page.client"));
const InvitationPageLazy = lazy(() => import("./invitations/page.client"));

export default function Page(props: PageProps) {
  const searchParams = use(props.searchParams);

  return (
    <PageLayout>
      <PageHeader heading="Suppliers" />
      <PageContent>
        <Tabs defaultValue={searchParams.tab?.toString() || "suppliers"}>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <TabsList className="bg-accent dark:bg-card p-1 px-2 rounded">
              <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
              <TabsTrigger value="invitations">Invitations</TabsTrigger>
            </TabsList>
            <div className="inline-flex gap-2">
              <Suspense key="invite">
                <CreateInvitationLazy key={"invite"} />
              </Suspense>
            </div>
          </div>
          <Suspense>
            <TabsContent value="suppliers">
              <SupplierPageLazy />
            </TabsContent>
            <TabsContent value="invitations">
              <InvitationPageLazy />
            </TabsContent>
          </Suspense>
        </Tabs>
      </PageContent>
    </PageLayout>
  );
}
