import React from "react";
import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { getUnitDetail } from "../page.actions";
import { PageProps } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MailIcon, PhoneIcon, UsersIcon } from "lucide-react";
import { format } from "date-fns";

export default async function Page(props: PageProps) {
  const unitId = props.params.id;

  if (!unitId) {
    return redirect("/organization/units");
  }

  const unit = await getUnitDetail(unitId);

  if (!unit) {
    return redirect("/organization/units");
  }
  return (
    <PageLayout>
      <PageHeader
        heading={unit.name}
        actions={[
          <Link key="edit" href={"/organization/units/${unit.id}/edit"}>
            <Button variant={"outline"}>Update</Button>
          </Link>,
          <Button key={"delete"} variant="destructive">
            Delete Unit
          </Button>,
        ]}
      />
      <PageContent>
        <Card className="bg-card/30 max-sm:p-2">
          <CardContent className="pt-5 max-sm:p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Unit Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          Unit Name
                        </dt>
                        <dd>{unit.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <UsersIcon className="h-4 w-4" />
                            <span className="">Members</span>
                          </div>
                        </dt>
                        <dd>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {unit.staffs?.length || 0} Staff Members
                            </span>
                          </div>
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <MailIcon className="h-4 w-4" />
                            Email
                          </div>
                        </dt>
                        <dd>{unit.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <PhoneIcon className="h-4 w-4" />
                            Phone
                          </div>
                        </dt>
                        <dd>{unit.phone}</dd>
                      </div>
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-muted-foreground">
                          Description
                        </dt>
                        <dd>{unit.description}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="md:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Unit Manager
                        </h3>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={unit.manager?.avatar || undefined}
                              alt={`${unit.manager?.firstName} ${unit.manager?.lastName}`}
                            />
                            <AvatarFallback>
                              {unit.manager?.firstName?.[0]}
                              {unit.manager?.lastName?.[0]}
                              {!unit.manager && "N/A"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {unit.manager?.firstName}{" "}
                              {unit.manager?.middleName}{" "}
                              {unit.manager?.lastName}
                              {!unit.manager && "No Manager"}
                            </p>
                            {unit.manager && (
                              <Link
                                href={`/organization/staffs/${unit.manager.id}`}
                              >
                                <Button variant="secondary" size="sm">
                                  View Profile
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">
                          Department Manager
                        </h3>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={unit.department.manager?.avatar || undefined}
                              alt={`${unit.department.manager?.firstName} ${unit.department.manager?.lastName}`}
                            />
                            <AvatarFallback>
                              {unit.department.manager?.firstName[0]}
                              {unit.department.manager?.lastName[0]}
                              {!unit.department.manager && "N/A"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {unit.department.manager?.firstName}{" "}
                              {unit.department.manager?.middleName}{" "}
                              {unit.department.manager?.lastName}
                              {!unit.department.manager && "No Manager"}
                            </p>
                            {unit.department.manager && (
                              <Link
                                href={`/organization/staffs/${unit.department.manager.id}`}
                              >
                                <Button variant="secondary" size="sm">
                                  View Profile
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-3 grid gap-5 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Staff Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {unit.staffs && unit.staffs.length > 0 ? (
                      <ul className="divide-y">
                        {unit.staffs.map((staff) => (
                          <li
                            key={staff.id}
                            className="py-3 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={staff.avatar || undefined}
                                  alt={`${staff.firstName} ${staff.lastName}`}
                                />
                                <AvatarFallback>
                                  {staff.firstName?.[0]}
                                  {staff.lastName?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {staff.firstName} {staff.middleName}{" "}
                                  {staff.lastName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {staff.position}
                                </p>
                              </div>
                            </div>
                            <Link href={`/organization/staffs/${staff.id}`}>
                              <Button variant="secondary" size="sm">
                                View Profile
                              </Button>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground">
                        No staff members assigned to this unit.
                      </p>
                    )}
                  </CardContent>
                </Card>

                <div className="">
                  <Card>
                    <CardHeader>
                      <CardTitle>System Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Unit ID
                          </dt>
                          <dd className="font-mono">{unit.id}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Created At
                          </dt>
                          <dd>{format(unit.createdAt, "PPPP")}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-muted-foreground">
                            Last Updated
                          </dt>
                          <dd>{format(unit.updatedAt, "PPPp")}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </PageLayout>
  );
}
