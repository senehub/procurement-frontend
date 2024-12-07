import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const pendingApprovals = [
  {
    id: "REQ-001",
    title: "New Supplier Registration",
    type: "Supplier",
    date: "2023-07-10",
  },
  {
    id: "PO-002",
    title: "Purchase Order #1234",
    type: "Purchase Order",
    date: "2023-07-11",
  },
  {
    id: "CON-003",
    title: "Contract Renewal - ABC Corp",
    type: "Contract",
    date: "2023-07-12",
  },
  {
    id: "INV-004",
    title: "Invoice Approval - $25,000",
    type: "Invoice",
    date: "2023-07-13",
  },
  {
    id: "REQ-005",
    title: "IT Equipment Request",
    type: "Requisition",
    date: "2023-07-14",
  },
];

export function PendingApprovals() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pending Approvals</CardTitle>
        <CardDescription>Items requiring your attention</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {pendingApprovals.map((approval) => (
            <li
              key={approval.id}
              className="flex items-center justify-between space-x-4"
            >
              <div>
                <p className="text-sm font-medium leading-none">
                  {approval.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {approval.type} - {approval.date}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Review
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
