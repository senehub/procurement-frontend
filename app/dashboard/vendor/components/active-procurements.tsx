import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const activeProcurements = [
  {
    id: "PRO-001",
    title: "Office Supplies",
    dueDate: "2023-07-15",
    status: "Pending",
  },
  {
    id: "PRO-002",
    title: "IT Equipment",
    dueDate: "2023-07-20",
    status: "Submitted",
  },
  {
    id: "PRO-003",
    title: "Cleaning Services",
    dueDate: "2023-07-25",
    status: "Under Review",
  },
];

export function ActiveProcurements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Procurements</CardTitle>
        <CardDescription>
          Your current active bids and their statuses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeProcurements.map((procurement) => (
              <TableRow key={procurement.id}>
                <TableCell>{procurement.id}</TableCell>
                <TableCell>{procurement.title}</TableCell>
                <TableCell>{procurement.dueDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      procurement.status === "Submitted"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {procurement.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
