"use client";

import { Button } from "@/components/ui/button";
import { Department } from "@/lib/types/organization/department";
import { shortenUUID } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const departmentColumns: ColumnDef<Department>[] = [
  {
    header: "Ref. ID",
    accessorFn: (unit) => shortenUUID(unit.id.toString()),
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Manager",
    accessorKey: "manager",
    accessorFn: (unit) => {
      if (!unit.manager) return "N/A";
      if (unit.manager.middleName) {
        return `${unit.manager.firstName} ${unit.manager.middleName} ${unit.manager.lastName}`;
      }
      return `${unit.manager.firstName} ${unit.manager.lastName}`;
    },
  },
  {
    header: "Stafs",
    accessorFn: (unit) =>
      `${unit.staffsCount} ${unit.staffsCount > 1 ? "staffs" : "staff"}`,
  },
  {
    header: "Units",
    accessorFn: (unit) =>
      `${unit.unitsCount} ${unit.unitsCount > 1 ? "staffs" : "staff"}`,
  },
  {
    header: "Actions",
    cell({ row }) {
      const isActive = true;

      if (isActive)
        return (
          <Link href={`/organization/departments/${row.id}/edit`}>
            <Button variant={"outline"} size={"sm"}>
              Update
            </Button>
          </Link>
        );
    },
  },
];
