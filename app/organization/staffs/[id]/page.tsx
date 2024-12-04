import React from "react";
import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getStaffDetalil } from "../page.actions";
import { PageProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";

export default async function Page({ params }: PageProps) {
  const staffId = params.id;

  if (!staffId) {
    return redirect("/organization/staffs");
  }

  const staff = await getStaffDetalil(staffId);

  if (!staff) {
    return redirect("/organization/staffs");
  }

  return (
    <PageLayout>
      <PageHeader
        heading="Staff Information"
        actions={[
          <Link key="edit" href={`/organization/staffs/${staff.id}/edit`}>
            <Button key={"edit"} variant="outline">
              Edit Staff
            </Button>
          </Link>,
          <Button
            key={"status"}
            variant={staff.isActive ? "destructive" : "default"}
          >
            {staff.isActive ? "Deactivate" : "Activate"}
          </Button>,
        ]}
      />
      <PageContent>
        <Card className="bg-card/30 max-sm:p-2">
          <CardContent className="pt-5 max-sm:p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <Card>
                  <CardContent className="pt-6 flex flex-col items-center">
                    <Avatar className="w-32 h-32 mb-4">
                      <AvatarImage
                        src={staff.avatar || undefined}
                        alt={`${staff.firstName} ${staff.lastName}`}
                      />
                      <AvatarFallback>
                        {staff.firstName[0]}
                        {staff.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold text-center mb-2">
                      {staff.firstName} {staff.middleName} {staff.lastName}
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      {staff.position}
                    </p>
                    <Badge
                      variant={staff.isActive ? "outline" : "destructive"}
                      className={cn(staff.isActive && "text-green-500")}
                    >
                      {staff.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{staff.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{staff.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </dt>
                        <dd>
                          {staff.firstName} {staff.middleName} {staff.lastName}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Gender
                        </dt>
                        <dd className="capitalize">{staff.gender}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Position
                        </dt>
                        <dd>{staff.position}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Status
                        </dt>
                        <dd>{staff.isActive ? "Active" : "Inactive"}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Department & Unit Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Department
                        </dt>
                        <dd>{staff.unit.department?.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Unit
                        </dt>
                        <dd>{staff.unit.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Department Manager
                        </dt>
                        <dd>
                          {staff.unit.department?.manager
                            ? `${staff.unit.department.manager.firstName} ${staff.unit.department.manager.lastName}`
                            : "Not assigned"}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Unit Manager
                        </dt>
                        <dd>
                          {staff.unit.manager
                            ? `${staff.unit.manager.firstName} ${staff.unit.manager.lastName}`
                            : "Not assigned"}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Staff ID
                        </dt>
                        <dd className="font-mono">{staff.id}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Created At
                        </dt>
                        <dd>{format(staff.createdAt, "PPPP")}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Last Updated
                        </dt>
                        <dd>{format(staff.updatedAt, "PPPp")}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  );
}
