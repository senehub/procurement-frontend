import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import React from "react";
import CreateInvitation from "./CreateInvitation";
import InvitationPage from "./page.client";

export default async function Page() {
  return (
    <PageLayout>
      <PageHeader
        heading="Supplier Invitations"
        actions={[<CreateInvitation key="new" />]}
      />
      <PageContent>
        <InvitationPage />
      </PageContent>
    </PageLayout>
  );
}
