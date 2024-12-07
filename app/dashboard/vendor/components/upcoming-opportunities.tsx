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

const upcomingOpportunities = [
  {
    id: "OPP-001",
    title: "Annual Stationery Supply",
    deadline: "2023-08-01",
    category: "Supplies",
  },
  {
    id: "OPP-002",
    title: "Network Infrastructure Upgrade",
    deadline: "2023-08-15",
    category: "IT",
  },
  {
    id: "OPP-003",
    title: "Corporate Event Management",
    deadline: "2023-08-30",
    category: "Services",
  },
];

export function UpcomingOpportunities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Opportunities</CardTitle>
        <CardDescription>
          Procurement opportunities you may be interested in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Category</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingOpportunities.map((opportunity) => (
              <TableRow key={opportunity.id}>
                <TableCell>{opportunity.id}</TableCell>
                <TableCell>{opportunity.title}</TableCell>
                <TableCell>{opportunity.deadline}</TableCell>
                <TableCell>
                  <Badge variant="outline">{opportunity.category}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
