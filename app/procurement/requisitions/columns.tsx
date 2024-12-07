"use client";

import { Button } from "@/components/ui/button";
import { shortenUUID } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { RequisitionInterface } from "./page.actions";

export const requisitionColumns: ColumnDef<RequisitionInterface>[] = [
  {
    header: "Ref. ID",
    accessorFn: (unit) => shortenUUID(unit.id.toString()),
  },
  {
    header: "Title",
    accessorKey: "title",
    accessorFn: (req) => `${req.title ? req.title : "PR Request"}`,
  },
  {
    header: "Staff",
    accessorKey: "staffId",
    accessorFn: (unit) => {
      if (unit.staff.middleName) {
        return `${unit.staff.firstName} ${unit.staff.middleName} ${unit.staff.lastName}`;
      }
      return `${unit.staff.firstName} ${unit.staff.lastName}`;
    },
  },
  {
    header: "Unit",
    accessorFn: (unit) => {
      return `${unit.unit.name}`;
    },
  },
  {
    header: "items",
    accessorFn: (unit) =>
      `${unit.items.length} ${unit.items.length > 1 ? "items" : "items"}`,
  },

  {
    header: "Actions",
    cell({ row }) {
      const isActive = true;
      if (isActive)
        return (
          <Link href={`/procurement/requisitions/${row.id}/edit`}>
            <Button variant={"outline"} size={"sm"}>
              Update
            </Button>
          </Link>
        );
    },
  },
];
