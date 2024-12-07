"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRequisitions } from "./page.actions";
import DataTable from "@/components/data-table";
import { requisitionColumns } from "./columns";
import { useRouter } from "next/navigation";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export default function RequisitionPage() {
  const router = useRouter();

  const [queryKey] = useState(() => {
    return ["staffs"];
  });

  const query = useQuery({
    queryKey,
    queryFn: async () => getRequisitions(DEFAULT_LIMIT, DEFAULT_OFFSET),
  });

  return (
    <DataTable
      rowId={"id"}
      columns={requisitionColumns}
      data={query.data?.requisitions}
      onRowClick={({ id }) => router.push(`/procurement/requisitions/${id}`)}
    />
  );
}
