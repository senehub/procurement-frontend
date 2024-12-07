"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Search } from "lucide-react";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getApprovalMatrixes, MatrixInterface } from "./page.actions";
import { ColumnDef } from "@tanstack/react-table";
import {
  // cleanUnitName,
  // cleanDepartmentName,
  moneyShotFormatter,
  shortenUUID,
} from "@/lib/utils";
import DataTable from "@/components/data-table";
import { format } from "date-fns";

export default function RequisitionApprovalsPage() {
  const [queryKey] = useState<QueryKey>(["matrixes"]);
  const [searchTerm, setSearchTerm] = useState("");

  const query = useQuery({
    queryKey,
    queryFn: async () => getApprovalMatrixes(),
  });

  return (
    <>
      <div className="mb-4 relative max-w-2xl mx-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search approval matrixes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <DataTable
        rowId={"id"}
        data={query.data}
        columns={columns}
        actionButtons={[
          <Link
            key={"create"}
            href="/procurement/approvals/requisition/new/matrix"
          >
            <Button className="rounded !px-2">
              <Plus className="h-4 w-4" /> Create
            </Button>
          </Link>,
        ]}
      />
    </>
  );
}

const columns: ColumnDef<MatrixInterface>[] = [
  {
    header: "Ref. ID",
    accessorFn: (matrix) => shortenUUID(matrix.id.toString()),
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  // {
  //   header: "Unit/Department",
  //   accessorFn: (matrix) => {
  //     if (matrix.unit && matrix.department)
  //       return `${cleanUnitName(matrix.unit.name)} / ${cleanDepartmentName(
  //         matrix.department.name
  //       )}`;
  //     if (matrix.unit && !matrix.department) {
  //       return `${cleanUnitName(matrix.unit.name)}`;
  //     }
  //     if (!matrix.unit && matrix.department) {
  //       return `${cleanUnitName(matrix.department.name)}`;
  //     }
  //     return `N/A`;
  //   },
  // },
  {
    header: "Worflow",
    accessorKey: "workflow.name",
  },
  {
    header: "Min-Amount",
    accessorKey: "minAmount",
    accessorFn: (matrix) => `D${moneyShotFormatter(matrix.minAmount)}`,
  },
  {
    header: "Max-Amount",
    accessorKey: "maxAmount",
    accessorFn: (matrix) => `D${moneyShotFormatter(matrix.maxAmount)}`,
  },
  {
    header: "Date Created",
    accessorKey: "createdAt",
    accessorFn: (matrix) => format(matrix.createdAt, "PP"),
  },
  {
    header: "Actions",
    cell({ row }) {
      const isActive = true;

      if (isActive)
        return (
          <div className="inline-flex w-max gap-1.5 items-center">
            <Link
              href={`/procurement/approvals/requisition/matrix/${row.id}/edit`}
            >
              <Button variant={"outline"} size={"sm"}>
                Update
              </Button>
            </Link>
            <Button variant={"destructive"} size={"sm"}>
              Delete
            </Button>
          </div>
        );
    },
  },
];
