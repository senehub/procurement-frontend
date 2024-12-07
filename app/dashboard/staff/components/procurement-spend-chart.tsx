"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { category: "IT", spend: 120000 },
  { category: "Office Supplies", spend: 80000 },
  { category: "Services", spend: 200000 },
  { category: "Equipment", spend: 150000 },
  { category: "Marketing", spend: 100000 },
];

export function ProcurementSpendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Procurement Spend by Category</CardTitle>
        <CardDescription>
          Overview of spending across different categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="spend" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
