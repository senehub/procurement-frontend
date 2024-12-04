"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUnits } from "./page.actions";
import DataTable from "@/components/data-table";
import { unitColumns } from "./columns";
import { useRouter } from "next/navigation";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export default function UnitPage() {
  const router = useRouter();

  const [queryKey] = useState(() => {
    return ["staffs"];
  });

  const query = useQuery({
    queryKey,
    queryFn: async () => getUnits(DEFAULT_LIMIT, DEFAULT_OFFSET),
  });

  return (
    <DataTable
      rowId={"id"}
      columns={unitColumns}
      data={query.data?.units}
      onRowClick={({ id }) => router.push(`/organization/units/${id}`)}
    />
  );
}
