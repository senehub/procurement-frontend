"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { SupplierInterface } from "./page.actions";
import StatusColumn from "@/components/data-table/status-column";
import ActionColumn from "@/components/data-table/actions-column";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const suppliersColumn: ColumnDef<SupplierInterface>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email Address",
    accessorKey: "contactEmail",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell({ row }) {
      const status = row.original.status;
      return <StatusColumn status={status} />;
    },
  },
  {
    header: "Date Joined",
    accessorFn: (inv) => format(new Date(inv.createdAt), "PPP"),
  },
  {
    id: "actions",
    cell({ row }) {
      const status = row.original.status;
      return (
        <ActionColumn
          actions={[
            <Button
              key="status"
              size={"sm"}
              className="w-full"
              variant={"secondary"}
              asChild
            >
              <Link href={`/suppliers/${row.original.id}`}>More Detail</Link>
            </Button>,
            <Button
              key="status"
              size={"sm"}
              className="w-full"
              variant={status ? "destructive" : "default"}
            >
              {status ? "Deactivate" : "Activate"}
            </Button>,
          ]}
        />
      );
    },
  },
];
