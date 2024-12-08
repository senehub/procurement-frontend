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
import { Columns2Icon, DownloadIcon, Loader2 } from "lucide-react";
import { downloadHTMLAsPdf } from "@/lib/client/htmt2PDF";
import { Fragment, ReactNode, useRef } from "react";
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

  actionButtons?: ReactNode[];

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

  const isLoading = props.data === undefined;

  return (
    <Card className="overflow-hidden p-0 " ref={dataTableRef}>
      <div className="p-2">
        <div className="flex mx-auto flex-wrap gap-2 px-2 items-center justify-between">
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
            {props.actionButtons &&
              props.actionButtons.map((action, index) => (
                <Fragment key={index}>{action}</Fragment>
              ))}
          </div>
        </div>
      </div>
      <Card className="pb-1 rounded-t-3xl bg-background overflow-clip">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id} className="px-2">
                  <TableHead className="w-max">
                    <small className="pl-2">#</small>
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
          <TableBody className="min-h-24">
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
                      "",
                      props.onRowClick
                        ? "cursor-pointer"
                        : "hover:bg-transparent"
                    )}
                  >
                    <TableCell className="w-max text-muted-foreground">
                      <small className="pl-2">{index + 1}.</small>
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
                <TableCell colSpan={props.columns.length + 1}>
                  <div className="w-full h-24 flex items-center justify-center">
                    {isLoading && (
                      <Loader2 className="animate-spin w-6 h-6 max-md:stroke-2" />
                    )}
                    {!isLoading && <span>No Results.</span>}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </Card>
  );
}
