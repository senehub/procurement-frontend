"use client";

import { Badge } from "@/components/ui/badge";
import { shortenUUID } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { InvitationInterface } from "./page.actions";

export const invitaionColumns: ColumnDef<InvitationInterface>[] = [
  {
    header: "ID",
    accessorFn: (inv) => shortenUUID(inv.id, 50),
  },
  {
    header: "Email Address",
    accessorKey: "emailAddress",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell({ row }) {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "pending"
              ? "secondary"
              : status === "revoked"
              ? "destructive"
              : "outline"
          }
          className={
            status === "accepted" ? "text-green-500 capitalize" : "capitalize"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    header: "Created At",
    accessorFn: (inv) => format(new Date(inv.createdAt), "PPp"),
  },
  {
    header: "Last Modified",
    accessorFn: (inv) => format(new Date(inv.updatedAt), "PPP"),
  },
];
