"use client";

import { Button } from "@/components/ui/button";
import { StaffInterface } from "@/lib/types/organization/staffs";
import { ColumnDef } from "@tanstack/react-table";
import { shortenUUID } from "@/lib/utils";
import Link from "next/link";

export const staffColumns: ColumnDef<StaffInterface>[] = [
  {
    header: "Ref. ID",
    accessorFn: (staff) => shortenUUID(staff.id.toString()),
  },
  {
    header: "Full Name",
    accessorFn: (staff) => {
      if (staff.middleName) {
        return `${staff.firstName} ${staff.middleName} ${staff.lastName}`;
      }
      return `${staff.firstName} ${staff.lastName}`;
    },
  },
  {
    header: "Position",
    accessorKey: "position",
  },
  {
    header: "Gender",
    accessorKey: "gender",
  },
  {
    header: "Unit/Department",
    accessorFn: (staff) =>
      `${staff.unit.name} / ${staff.unit.department?.name || "N/A"}`,
  },
  {
    header: "Status",
    accessorFn: (staff) => (staff.isActive ? "Active" : "Inactive"),
    cell({ row }) {
      const isActive = row.original.isActive;

      if (isActive) {
        return (
          <div
            className={`px-2 py-1 w-max rounded-full text-xs bg-green-100 text-green-800`}
          >
            Active
          </div>
        );
      }
      return (
        <div
          className={`px-2 py-1 w-max rounded-full text-xs bg-red-100 text-red-800`}
        >
          Inactive
        </div>
      );
    },
  },
  {
    header: "Actions",
    accessorFn: (staff) => (staff.isActive ? "Active" : "Inactive"),
    cell({ row }) {
      const isActive = row.original.isActive;

      return (
        <div className="inline-flex items-center gap-1.5">
          {!isActive && <Button size={"sm"}>Activate</Button>}
          {isActive && (
            <>
              <Link href={`/organization/staffs/${row.id}/edit`}>
                <Button variant={"outline"} size={"sm"}>
                  Updated
                </Button>
              </Link>
              <Button variant={"destructive"} size={"sm"}>
                Deactivate
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];
