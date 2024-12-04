"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Columns2Icon, DownloadIcon } from "lucide-react";
import { downloadHTMLAsPdf } from "@/lib/client/htmt2PDF";
import { useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  TableOptions,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";

const fallbackData = [] as unknown;

interface DataTableProps<TD, TV> {
  data?: TD[];
  columns: ColumnDef<TD, TV>[];

  rowId: keyof TD;
  onRowClick?: (row: TD) => void;

  tableOptions?: Partial<TableOptions<TD>>;
}

export default function DataTable<TD, TV>(props: DataTableProps<TD, TV>) {
  const onRowSelect = (ev: React.MouseEvent<HTMLTableRowElement>, row: TD) => {
    const target = ev.target as HTMLElement;
    if (target.tagName === "BUTTON" || target.tagName === "A") {
      return;
    }
    props.onRowClick?.(row);
  };

  async function downloadTable() {
    const element = dataTableRef.current;
    if (!element) return;
    downloadHTMLAsPdf({
      IgnoreElement: (element) => element.hasAttribute("data-ignore-print"),
      onCallback: (error) => {
        if (error) {
          alert(error.message);
          return;
        }
        alert("Downloaded");
      },
      target: element,
      filename: "inventory-data.pdf",
    });
  }

  const dataTableRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    ...props.tableOptions,
    columns: props.columns,
    data: props.data || (fallbackData as TD[]),
    getRowId(originalRow, index) {
      return originalRow[props.rowId]?.toString() || index.toString();
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="overflow-hidden p-0" ref={dataTableRef}>
      <div className="border-b p-2">
        <div className="flex w-[90svh] sm:w-[90%] mx-auto items-center justify-between">
          <div className="inline-flex gap-2">
            <Button
              data-ignore-print
              size={"icon"}
              variant={"secondary"}
              className="rounded"
            >
              <Columns2Icon />
            </Button>
          </div>
          <div className="inline-flex gap-2">
            <Button
              data-ignore-print
              onClick={downloadTable}
              size={"icon"}
              variant={"secondary"}
              className="rounded"
            >
              <DownloadIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  <TableHead className="w-max">
                    <small>#</small>
                  </TableHead>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, index) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : ""}
                    onClick={(ev) => {
                      onRowSelect(ev, row.original);
                    }}
                    className={cn(
                      props.onRowClick
                        ? "cursor-pointer"
                        : "hover:bg-transparent"
                    )}
                  >
                    <TableCell className="w-max text-muted-foreground">
                      <small>{index + 1}.</small>
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={props.columns.length + 1}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
