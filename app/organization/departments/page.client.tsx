"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "./page.actions";
import DataTable from "@/components/data-table";
import { departmentColumns } from "./columns";
import { useRouter } from "next/navigation";

// type Props = {};

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export default function DepartmentPage() {
  const router = useRouter();
  const [queryKey] = useState(() => {
    return ["staffs"];
  });

  const query = useQuery({
    queryKey,
    queryFn: async () => getDepartments(DEFAULT_LIMIT, DEFAULT_OFFSET),
  });

  return (
    <DataTable
      rowId={"id"}
      columns={departmentColumns}
      data={query.data?.departments}
      onRowClick={({ id }) => router.push(`/organization/departments/${id}`)}
    />
  );
}
