"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  approveRequisition,
  RequisitionDetailInterface,
} from "../page.actions";
import { useMemo, useState } from "react";
import { userStore } from "@/store/user/session";
import { Link, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

type Props = {
  requisitionId: string;
  requisitionStaffId: string;

  workflow: RequisitionDetailInterface["approvalWorkflow"];
  approvalRecords: RequisitionDetailInterface["approvalRecords"];
};

export function ApprovalDialog(props: Props) {
  const session = userStore().session;

  const currentApprovalStep = useMemo(() => {
    if (!session) return null;

    const remainingApprovalsSteps = props.workflow.steps.reduce(
      (acc, workflowStep) => {
        const stepExecuted = props.approvalRecords.find(
          ({ approvalStepId }) => approvalStepId === workflowStep.step.id
        );

        if (!stepExecuted) acc.push(workflowStep);

        return acc;
      },
      [] as typeof props.workflow.steps
    );

    if (remainingApprovalsSteps.length < 1) return null;

    remainingApprovalsSteps.sort((a, b) => a.stepOrder - b.stepOrder);
    const nextStep = remainingApprovalsSteps[0]?.step;

    const staffId = session.staffId;

    if (nextStep?.staff.id === staffId) return nextStep;

    return null;
  }, [session, props]);

  const [loading, setLoading] = useState(false);

  async function accept() {
    try {
      if (!session?.staffId || !currentApprovalStep) {
        throw new Error(
          !session?.staffId
            ? "Your session has expired."
            : "Your don't have permission to perform this action"
        );
      }
      setLoading(true);
      const response = await approveRequisition(location.pathname, {
        approval: "accepted",
        staffId: session.staffId,
        requisitionId: props.requisitionId,
        approvalStepId: currentApprovalStep.id,
      });

      if (response.error) throw new Error(response.message);

      toast({
        title: "Approval Confirmed",
        description: response.message || format(new Date(), "PPPp"),
        action: (
          <Button variant={"outline"} onClick={() => accept()} asChild>
            <Link
              href={`/procurement/requisitions/${props.requisitionId}/approvals#${response.data.id}`}
            >
              View Record
            </Link>
          </Button>
        ),
      });
    } catch (error) {
      let errorMessage = "!Error perfomring operation";
      if (error instanceof Error) errorMessage = error.message;
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
        action: (
          <Button variant={"outline"} onClick={() => accept()}>
            Try Again
          </Button>
        ),
      });
    } finally {
      setLoading(false);
    }
  }

  async function decline() {
    try {
      if (!session?.staffId || !currentApprovalStep) {
        throw new Error(
          !session?.staffId
            ? "Your session has expired."
            : "Your don't have permission to perform this action"
        );
      }
      setLoading(true);
      const response = await approveRequisition(location.pathname, {
        approval: "declined",
        staffId: session.staffId,
        requisitionId: props.requisitionId,
        approvalStepId: currentApprovalStep.id,
      });

      if (response.error) throw new Error(response.message);

      toast({
        title: "Approval Confirmed",
        description: response.message || format(new Date(), "PPPp"),
        action: (
          <Button variant={"outline"} onClick={() => accept()} asChild>
            <Link
              href={`/procurement/requisitions/${props.requisitionId}/approvals#${response.data.id}`}
            >
              View Record
            </Link>
          </Button>
        ),
      });
    } catch (error) {
      let errorMessage = "!Error perfomring operation";
      if (error instanceof Error) errorMessage = error.message;
      toast({
        title: "Error",
        variant: "destructive",
        description: errorMessage,
        action: (
          <Button variant={"outline"} onClick={() => accept()}>
            Try Again
          </Button>
        ),
      });
    } finally {
      setLoading(false);
    }
  }

  if (!currentApprovalStep) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={loading}>
          {loading && <Loader2 className="animate-spin w-4 h-4 mr-1.5" />}
          Approval
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Requisition Approval</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to proceed?
            Please note that this will affect the entire approval process.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <AlertDialogFooter className="pt-3">
          <div className="justify-between flex items-center w-full">
            <div className="">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </div>
            <div className="inline-flex gap-3">
              <Button variant="destructive" onClick={decline}>
                Decline
              </Button>
              <AlertDialogAction onClick={accept}>Approve</AlertDialogAction>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
