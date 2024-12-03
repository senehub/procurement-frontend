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

export default function DataTable() {
  const data = [
    {
      id: "1",
      sku: "ABC123",
      name: "Product A",
      category: "Electronics",
      quantity: 100,
      unitPrice: 100.0,
      reorderPoint: 50,
    },
    {
      id: "2",
      sku: "DEF456",
      name: "Product B",
      category: "Home Goods",
      quantity: 200,
      unitPrice: 50.0,
      reorderPoint: 100,
    },
    {
      id: "3",
      sku: "GHI789",
      name: "Product C",
      category: "Clothing",
      quantity: 50,
      unitPrice: 75.0,
      reorderPoint: 25,
    },
  ];

  function onRowSelect(rowId: string) {
    console.log(rowId);
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onRowSelect(item.id)}
            >
              <TableCell className="font-medium">{item.sku}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                ${item.unitPrice.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.quantity <= item.reorderPoint
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {item.quantity <= item.reorderPoint
                    ? "Low Stock"
                    : "In Stock"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
