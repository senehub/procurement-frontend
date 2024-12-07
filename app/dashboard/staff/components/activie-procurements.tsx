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
    title: "Office Furniture",
    dueDate: "2023-07-15",
    status: "In Progress",
    bids: 5,
  },
  {
    id: "PRO-002",
    title: "IT Equipment",
    dueDate: "2023-07-20",
    status: "Under Review",
    bids: 8,
  },
  {
    id: "PRO-003",
    title: "Cleaning Services",
    dueDate: "2023-07-25",
    status: "Pending Approval",
    bids: 3,
  },
  {
    id: "PRO-004",
    title: "Marketing Services",
    dueDate: "2023-08-01",
    status: "In Progress",
    bids: 6,
  },
];

export function ActiveProcurements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Procurements</CardTitle>
        <CardDescription>
          Overview of ongoing procurement processes
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
              <TableHead>Bids</TableHead>
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
                      procurement.status === "In Progress"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {procurement.status}
                  </Badge>
                </TableCell>
                <TableCell>{procurement.bids}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
