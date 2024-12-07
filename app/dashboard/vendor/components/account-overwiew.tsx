import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  status: "active" | "inactive" | "suspended";
};

export function AccountOverview(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>
          Your current account status and key metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              Account Status
            </span>
            <span className="mt-1 text-2xl font-semibold">
              <Badge
                variant={props.status === "active" ? "default" : "destructive"}
              >
                {props.status}
              </Badge>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              Active Bids
            </span>
            <span className="mt-1 text-2xl font-semibold">5</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              Won Contracts
            </span>
            <span className="mt-1 text-2xl font-semibold">12</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </span>
            <span className="mt-1 text-2xl font-semibold">$1.2M</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
