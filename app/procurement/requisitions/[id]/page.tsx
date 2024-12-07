import PageContent from "@/components/page-content";
import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notFound } from "next/navigation";
import { PageProps } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn, combineFullName, moneyFormatter } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarDays,
  Clock,
  XCircle,
  CheckCircle,
  FileText,
  LinkIcon,
} from "lucide-react";
import {
  getRequisitionDetail,
  RequisitionDetailInterface,
} from "../page.actions";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ApprovalDialog } from "./ApprovalDialog";
import { format } from "date-fns";

export default async function Page({ params }: PageProps) {
  const requisition = await getRequisitionDetail(params.id);

  if (!requisition) return notFound();

  const total = requisition.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const approvalRecords = mergeWorkflowStepsWithRecords(
    requisition.approvalRecords,
    requisition.approvalWorkflow.steps
  );

  return (
    <PageLayout>
      <PageContent className="!pt-0 !mt-0">
        <div className="flex flex-wrap gap-2 items-center justify-between mb-6">
          <div className="">
            <h1 className="text-3xl font-bold">{requisition.title}</h1>
            <p className="text-muted-foreground">{requisition.comment}</p>
          </div>
          <div className="inline-flex gap-2">
            <ApprovalDialog
              requisitionId={params.id}
              workflow={requisition.approvalWorkflow}
              requisitionStaffId={requisition.staff.id}
              approvalRecords={requisition.approvalRecords}
            />
            {requisition.approvalRecords.length == 0 && (
              <>
                <Link href={`/procurement/requisitions/${requisition.id}/edit`}>
                  <Button variant={"outline"}>
                    <FileText className="mr-2 h-4 w-4" />
                    Update
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Requisition Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 md:text-sm">
                  <div className="flex justify-between">
                    <dt className="font-medium">ID</dt>
                    <dd>
                      <span className={"text-xs text-muted-foreground"}>
                        {requisition.id}
                      </span>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Status</dt>
                    <dd>
                      <Badge
                        className={cn(
                          requisition.status === "accepted" && "text-green-500"
                        )}
                        variant={
                          requisition.status === "accepted"
                            ? "outline"
                            : requisition.status === "declined"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {requisition.status!.charAt(0).toUpperCase() +
                          requisition.status!.slice(1)}
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Priority</dt>
                    <dd>
                      <Badge
                        className={cn(
                          requisition.priority === "medium" && "text-yellow-500"
                        )}
                        variant={
                          requisition.priority === "high"
                            ? "destructive"
                            : requisition.priority === "medium"
                            ? "outline"
                            : "default"
                        }
                      >
                        {requisition.priority.charAt(0).toUpperCase() +
                          requisition.priority.slice(1)}
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Unit/Dept.</dt>
                    <dd>
                      {requisition.unit?.name?.replace(/unit/gi, "").trim()}
                      {" / "}
                      {requisition.unit.department?.name
                        ?.replace(/department/gi, "")
                        .trim()}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-medium">Total Amount</dt>
                    <dd>{moneyFormatter(total)}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Created By</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={requisition.staff.avatar!} />
                    <AvatarFallback>
                      {requisition.staff.firstName?.[0]}
                      {requisition.staff.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {combineFullName(requisition.staff)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <CalendarDays className="inline-block w-4 h-4 mr-1" />
                      {new Date(requisition.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Approval Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                  {approvalRecords.map((approvalRecord) => {
                    return (
                      <li key={approvalRecord.id} className="mb-6 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          {approvalRecord.approval === "accepted" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : approvalRecord.approval === "declined" ? (
                            <XCircle className="w-5 h-5 text-red-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          )}
                        </span>
                        <h3 className="font-medium leading-tight">
                          {approvalRecord?.stepName || "Step Deleted"}
                        </h3>
                        <p className="text-sm">
                          {approvalRecord.approval === "accepted" ? (
                            <div className="inline-grid">
                              <span className="text-muted-foreground">
                                <span className="text-green-500">Accepted</span>
                                {": - "}
                                <Link
                                  href={`/organization/staffs/${approvalRecord.staff.id}`}
                                  className="font-semibold hover:underline underline-offset-4 hover:text-foreground transition"
                                >
                                  {combineFullName(approvalRecord.staff)}
                                </Link>
                              </span>
                              <span className="text-muted-foreground">
                                {approvalRecord.createdAt &&
                                  format(approvalRecord.createdAt, "PPp")}
                              </span>
                            </div>
                          ) : approvalRecord.approval === "declined" ? (
                            <div className="inline-grid">
                              <span className="text-muted-foreground">
                                <span className="text-red-500">Rejected</span>
                                {": - "}
                                <Link
                                  href={`/organization/staffs/${approvalRecord.staff.id}`}
                                  className="font-semibold hover:underline underline-offset-4 hover:text-foreground transition"
                                >
                                  {combineFullName(approvalRecord.staff)}
                                </Link>
                              </span>
                              <span className="text-muted-foreground">
                                {approvalRecord.createdAt &&
                                  format(approvalRecord.createdAt, "PPp")}
                              </span>
                            </div>
                          ) : (
                            <div className="inline-grid">
                              <span className="text-muted-foreground">
                                Pending Approval
                              </span>
                              <span className="text-muted-foreground">
                                Approver:{" "}
                                <Link
                                  href={`/organization/staffs/${approvalRecord.staff.id}`}
                                  className="font-semibold hover:underline underline-offset-4 hover:text-foreground transition"
                                >
                                  {combineFullName(approvalRecord.staff)}
                                </Link>
                              </span>
                            </div>
                          )}
                        </p>
                      </li>
                    );
                  })}
                </ol>
              </CardContent>
              <Separator />
              <CardFooter className="pt-4 flex flex-col items-center justify-center gap-1">
                <p className="text-muted-foreground">Workflow</p>
                <Link
                  href={`/procurement/approvals/requisition/workflow/${requisition.approvalWorkflow?.id}`}
                  className=""
                  target="_blank"
                >
                  <Button
                    className="inline-flex gap-2 md:gap-4 lg:gap-6"
                    variant={"secondary"}
                  >
                    {requisition.approvalWorkflow?.name}
                    <LinkIcon />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Requisition Items</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-muted-foreground">
                      <th className="text-left py-2">
                        <small>#</small>
                      </th>
                      <th className="text-left py-2">Item</th>
                      <th className="text-right py-2">Quantity</th>
                      <th className="text-right py-2">Unit Price</th>
                      <th className="text-right py-2">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requisition.items.map((item, index) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">
                          <small>{index + 1}.</small>
                        </td>
                        <td className="py-2">{item.name}</td>
                        <td className="text-right py-2">{item.quantity}</td>
                        <td className="text-right py-2">
                          {item.unitPrice.toFixed(2)}
                        </td>
                        <td className="text-right py-2">
                          {(item.unitPrice * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="text-right font-medium py-2">
                        Total:
                      </td>
                      <td className="text-right font-medium py-2">
                        {moneyFormatter(total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Edit Requisition
                  </Button>
                  <Button variant="outline">
                    <User className="mr-2 h-4 w-4" />
                    Assign Approver
                  </Button>
                </div>
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader>
                <CardTitle>Comments</CardTitle>
                <CardDescription>
                  Discussion about this requisition.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center p-4 space-y-2 pb-6">
                {/* Add your comment component here */}
                <p className="text-muted-foreground">No comments yet.</p>
                <Button variant="outline">Add Comment</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContent>
    </PageLayout>
  );
}

function mergeWorkflowStepsWithRecords(
  records: RequisitionDetailInterface["approvalRecords"],
  steps: RequisitionDetailInterface["approvalWorkflow"]["steps"]
) {
  const data = steps.map((workflowStep, index) => {
    const approvalRecord = records.find(
      ({ approvalStepId }) => approvalStepId === workflowStep.step.id
    );
    return {
      id: approvalRecord?.id || index,
      stepName: workflowStep.step.name,
      staff: approvalRecord?.staff || workflowStep.step.staff,
      approval: approvalRecord?.approval || "pending",
      createdAt: approvalRecord?.createdAt,
    };
  });

  return data;
}
