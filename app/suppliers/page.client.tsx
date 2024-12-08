"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSuppliers } from "./page.actions";
import DataTable from "@/components/data-table";
import { suppliersColumn } from "./columns";
import { useRouter } from "next/navigation";

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 0;

export default function SupplierPage() {
  const router = useRouter();

  const [queryKey] = useState(() => {
    return ["suppliers"];
  });

  const query = useQuery({
    queryKey,
    queryFn: async () => getSuppliers(DEFAULT_LIMIT, DEFAULT_OFFSET),
  });

  return (
    <DataTable
      rowId={"id"}
      columns={suppliersColumn}
      data={query.data?.suppliers}
      onRowClick={({ id }) => router.push(`/suppliers/${id}`)}
    />
  );
}
