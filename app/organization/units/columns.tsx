"use client";

import { Button } from "@/components/ui/button";
import { UnitInterface } from "@/lib/types/organization/unit";
import { shortenUUID } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const unitColumns: ColumnDef<UnitInterface>[] = [
  // {
  //   header: "Ref. ID",
  //   accessorFn: (unit) => shortenUUID(unit.id.toString()),
  // },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Staffs",
    accessorFn: (unit) =>
      `${unit.staffsCount} ${unit.staffsCount > 1 ? "staffs" : "staff"}`,
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
    header: "Department",
    accessorFn: (unit) => `${unit.department.name}`,
  },

  {
    header: "Actions",
    cell({ row }) {
      const isActive = true;
      if (isActive)
        return (
          <Link href={`/organization/units/${row.id}/edit`}>
            <Button variant={"outline"} size={"sm"}>
              Update
            </Button>
          </Link>
        );
    },
  },
];
