"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import StaffSelection from "@/components/widgets/staff-selection";
import {
  approvalStepFormSchema,
  TypeApprovalStepFormSchema,
} from "../../page.validators";
import { createApprovalStep } from "../../page.actions";

type Props = {
  approvalStepId?: string;
  defaultValues?: TypeApprovalStepFormSchema;
};

export default function ApprovalStepForm(props: Props) {
  const router = useRouter();

  const form = useForm<TypeApprovalStepFormSchema>({
    resolver: zodResolver(approvalStepFormSchema),
    defaultValues: props.defaultValues || {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: TypeApprovalStepFormSchema) {
    const isUpdate = !!props.approvalStepId;
    try {
      if (isUpdate === true) throw new Error("Update is available yet");

      const response = await createApprovalStep(values);

      if (!response.id)
        throw new Error(
          `Failded to ${isUpdate ? "update" : "create"} approval steps`
        );

      toast({
        title: "Approval Step Created",
        description: `Your ${
          isUpdate ? "" : "new"
        } approval step has been successfully ${
          isUpdate ? "updated" : "created"
        }.`,
      });
      router.push("/procurement/approvals/requisition?tab=steps");
    } catch (error: unknown) {
      let errorMsg = `There was a problem  ${
        isUpdate ? "updating" : "creating"
      } the approval step.`;

      if (error instanceof Error) errorMsg = error.message;

      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      //
    }
  }

  return (
    <Card className="max-w-[900px] mx-auto bg-card/30">
      <CardHeader className="py-3">
        <CardTitle>
          {props.approvalStepId
            ? "Edit Approval Step"
            : "Generate New Approval Step"}
        </CardTitle>
        <CardDescription>
          {props.approvalStepId
            ? "Update the details of this approval step"
            : "Set up a new approval step for requisition workflows"}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Step Name</FormLabel>
                    <FormDescription>
                      A name for this approval step
                    </FormDescription>
                    <FormControl>
                      <Input placeholder="Enter step name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="staffId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Approver</FormLabel>
                    <FormDescription>
                      Responsible for this approval step
                    </FormDescription>
                    <StaffSelection
                      name={field.name}
                      value={field.value}
                      placeholder="Select an approver"
                      onValueChange={(value) =>
                        form.setValue(field.name, value)
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormDescription>
                    Provide a brief description of this approval step
                  </FormDescription>
                  <FormControl>
                    <Textarea placeholder="Enter step description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-between border-t pt-5 pb-0 mt-4 px-0">
              <Button
                variant="outline"
                type="button"
                disabled={form.formState.isSubmitting}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {form.formState.isSubmitting
                  ? props.approvalStepId
                    ? "Updating..."
                    : "Creating..."
                  : props.approvalStepId
                  ? "Update Approval Step"
                  : "Create Approval Step"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
