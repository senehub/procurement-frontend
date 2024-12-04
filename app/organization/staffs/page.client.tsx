"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStaffs } from "./page.actions";
import DataTable from "@/components/data-table";
import { staffColumns } from "./columns";
import { useRouter } from "next/navigation";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export default function StaffPage() {
  const router = useRouter();
  const [queryKey] = useState(() => {
    return ["staffs"];
  });

  const query = useQuery({
    queryKey,
    queryFn: async () => getStaffs(DEFAULT_LIMIT, DEFAULT_OFFSET),
  });

  return (
    <DataTable
      rowId={"id"}
      data={query.data?.staffs}
      columns={staffColumns}
      onRowClick={({ id }) => router.push(`/organization/staffs/${id}`)}
    />
  );
}
