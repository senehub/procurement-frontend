import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

const kpis = [
  {
    title: "Total Active Procurements",
    value: 24,
    change: 3,
    isPositive: true,
  },
  {
    title: "Average Cycle Time",
    value: "45 days",
    change: 2,
    isPositive: false,
  },
  {
    title: "Supplier Compliance Rate",
    value: "94%",
    change: 1,
    isPositive: true,
  },
  { title: "Cost Savings", value: "$1.2M", change: 5, isPositive: true },
];

export function KPIOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Performance Indicators</CardTitle>
        <CardDescription>
          Overview of critical procurement metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </p>
              <div className="flex items-center">
                <span className="text-2xl font-bold">{kpi.value}</span>
                <span
                  className={`ml-2 flex items-center text-sm ${
                    kpi.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {kpi.isPositive ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  {kpi.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
