"use client";

import { Button } from "@/components/ui/button";
import { StaffInterface } from "@/lib/types/organization/staffs";
import { ColumnDef } from "@tanstack/react-table";
import { shortenUUID } from "@/lib/utils";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { ReactNode } from "react";
import ActionColumn from "@/components/data-table/actions-column";

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
    header: "Unit",
    accessorFn: (staff) => `${staff.unit.name}`,
  },
  {
    header: "Status",
    accessorFn: (staff) => (staff.isActive ? "Active" : "Inactive"),
    cell({ row }) {
      const isActive = row.original.isActive;

      if (isActive) {
        return (
          <div
            className={`px-2 py-1 w-max rounded-full text-xs bg-green-500/10 text-green-500`}
          >
            Active
          </div>
        );
      }
      return (
        <div
          className={`px-2 py-1 w-max rounded-full text-xs bg-red-500/10 text-red-500`}
        >
          Inactive
        </div>
      );
    },
  },

  {
    id: "actions",
    cell({ row }) {
      const isActive = row.original.isActive;

      const actions = [] as ReactNode[];

      if (!isActive) {
        actions.push(
          <Button key="activate" size={"sm"}>
            Activate
          </Button>
        );
      }

      if (isActive) {
        actions.push(
          <Button
            asChild
            key={"edit"}
            className="w-full rounded"
            variant={"secondary"}
            size={"sm"}
          >
            <Link href={`/organization/staffs/${row.id}/edit`}>Updated</Link>
          </Button>
        );

        actions.push(
          <Button
            variant={"secondary"}
            size={"sm"}
            key={"destructive"}
            className="w-full rounded text-destructive hover:text-destructive"
          >
            Deactivate
          </Button>
        );
      }

      return <ActionColumn actions={actions} />;
    },
  },
];
