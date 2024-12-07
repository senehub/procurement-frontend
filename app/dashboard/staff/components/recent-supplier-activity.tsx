import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const recentActivities = [
  {
    id: 1,
    supplier: "Tech Solutions Inc.",
    action: "Submitted a bid for IT Equipment",
    time: "2 hours ago",
  },
  {
    id: 2,
    supplier: "Office Supplies Co.",
    action: "Updated company profile",
    time: "5 hours ago",
  },
  {
    id: 3,
    supplier: "Cleaning Experts Ltd.",
    action: "Sent a message regarding Cleaning Services RFP",
    time: "1 day ago",
  },
  {
    id: 4,
    supplier: "Marketing Gurus",
    action: "Accepted invitation to bid",
    time: "2 days ago",
  },
];

export function RecentSupplierActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Supplier Activity</CardTitle>
        <CardDescription>Latest actions from your suppliers</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>
                  {activity.supplier.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.supplier}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
