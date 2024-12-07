import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, FileText, Settings } from "lucide-react";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Frequently used actions for easy access
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button className="w-full justify-start">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Bid
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Browse Opportunities
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          View Contracts
        </Button>
        <Button className="w-full justify-start" variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Account Settings
        </Button>
      </CardContent>
    </Card>
  );
}
