"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getInvitations } from "./page.actions";
import DataTable from "@/components/data-table";
import { invitationColumns } from "./columns";
import { useRouter } from "next/navigation";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export default function InvitationPage() {
  const router = useRouter();

  const [queryKey] = useState(() => {
    return ["invitations"];
  });

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getInvitations(DEFAULT_LIMIT, DEFAULT_OFFSET);
      if (response.error) throw new Error(response.message);
      return response.data;
    },
  });

  return (
    <DataTable
      rowId={"id"}
      columns={invitationColumns}
      data={query.data?.data}
      onRowClick={({ id }) => router.push(`/suppliers/${id}`)}
    />
  );
}
