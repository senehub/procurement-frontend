"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Plus, Search } from "lucide-react";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getApprovalSteps, ApprovalStepInterface } from "./page.actions";
import { ColumnDef } from "@tanstack/react-table";
import { shortenUUID } from "@/lib/utils";
import DataTable from "@/components/data-table";
import { format } from "date-fns";

export default function RequisitionApprovalsPage() {
  const [queryKey] = useState<QueryKey>(["approval-steps"]);
  const [searchTerm, setSearchTerm] = useState("");

  const query = useQuery({
    queryKey,
    queryFn: async () => getApprovalSteps(),
  });

  return (
    <>
      <div className="mb-4 relative max-w-2xl mx-auto">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search approval steps..."
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
            href="/procurement/approvals/requisition/new/step"
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

const columns: ColumnDef<ApprovalStepInterface>[] = [
  {
    header: "Ref. ID",
    accessorFn: (step) => shortenUUID(step.id.toString()),
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => {
      return (
        <p className="text-xs max-w-[25ch] line-clamp-2">
          {row.original.description}
        </p>
      );
    },
  },
  {
    header: "Approver",
    accessorFn: (step) => {
      if (step.staff.middleName)
        return `${step.staff.firstName} ${step.staff.middleName} ${step.staff.lastName}`;

      return `${step.staff.firstName} ${step.staff.lastName}`;
    },
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
              href={`/procurement/approvals/requisition/step/${row.id}/edit`}
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
