import DataTable from "@/components/data-table";
import PageContent from "@/components/page-content";
import PageHeader from "@/components/page-header";
import PageLayout from "@/components/page-layout";
import React from "react";
import { invitaionColumns } from "./columns";
import { getInvitations } from "./page.actions";
import CreateInvitation from "./CreateInvitation";

export default async function Page() {
  const invitaions = await getInvitations();

  if (invitaions.error)
    return (
      <pre>
        <code>{JSON.stringify(invitaions)}</code>
      </pre>
    );
  return (
    <PageLayout>
      <PageHeader
        heading="Supplier Invitations"
        actions={[<CreateInvitation key="new" />]}
      />
      <PageContent>
        <DataTable
          rowId={"id"}
          data={invitaions.data.data}
          columns={invitaionColumns}
        />
      </PageContent>
    </PageLayout>
  );
}
