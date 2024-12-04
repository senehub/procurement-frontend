import React from "react";
import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getDepartmentDetail } from "../page.actions";
import { PageProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Building2Icon, UsersIcon, PhoneIcon, MailIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { format } from "date-fns";

export default async function Page(props: PageProps) {
  const departmentId = props.params.id;

  if (!departmentId) {
    return redirect("/organization/departments");
  }

  const department = await getDepartmentDetail(departmentId);

  if (!department) {
    return redirect("/organization/departments");
  }

  return (
    <PageLayout>
      <PageHeader
        heading={department.name}
        actions={[
          <Link
            key={"edit"}
            href={`/organization/departments/${departmentId}/edit`}
          >
            <Button variant="outline">Update</Button>
          </Link>,
          <Button key={"delete"} variant="destructive">
            Delete
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
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{department.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{department.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {department.staffsCount} Staff Members
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {department.unitsCount} Units
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Department Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Department Name
                        </dt>
                        <dd>{department.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Email
                        </dt>
                        <dd>{department.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Phone
                        </dt>
                        <dd>{department.phone}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Total Staff
                        </dt>
                        <dd>{department.staffsCount}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Description
                        </dt>
                        <dd>{department.description}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Department Manager</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={department.manager?.avatar || undefined}
                          alt={`${department.manager?.firstName} ${department.manager?.lastName}`}
                        />
                        <AvatarFallback>
                          {department.manager?.firstName[0]}
                          {department.manager?.lastName[0]}
                          {!department.manager && "N/A"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {department.manager?.firstName}{" "}
                          {department.manager?.middleName}{" "}
                          {department.manager?.lastName}
                          {!department.manager && "No Manager"}
                        </p>
                        {department.manager && (
                          <Link
                            href={`/organization/staffs/${department.manager.id}`}
                          >
                            <Button variant="secondary" size="sm">
                              View Profile
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Units</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {department.units.length > 0 ? (
                      <ul className="divide-y">
                        {department.units.map((unit) => (
                          <li key={unit.id} className="py-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">{unit.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {unit.description}
                                </p>
                              </div>
                              <Link href={`/organization/units/${unit.id}`}>
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                            <div className="mt-2 flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <UsersIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">
                                  {unit.staffsCount} Staff
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MailIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{unit.email}</span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        No units assigned to this department.
                      </p>
                    )}
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
                          Department ID
                        </dt>
                        <dd className="font-mono">{department.id}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Created At
                        </dt>
                        <dd>{format(department.createdAt, "PPPP")}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Last Updated
                        </dt>
                        <dd>{format(department.updatedAt, "PPPp")}</dd>
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
