import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell, CheckCircle, AlertCircle } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "info",
    message: "New procurement opportunity available",
    date: "2023-07-01",
  },
  {
    id: 2,
    type: "success",
    message: "Your bid for Project XYZ was accepted",
    date: "2023-06-28",
  },
  {
    id: 3,
    type: "warning",
    message: "Deadline approaching for Tender ABC",
    date: "2023-06-25",
  },
];

export function RecentNotifications() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
        <CardDescription>
          Stay updated with the latest procurement activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li key={notification.id} className="flex items-start space-x-4">
              {notification.type === "info" && (
                <Bell className="h-5 w-5 text-blue-500" />
              )}
              {notification.type === "success" && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              {notification.type === "warning" && (
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              )}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.message}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
