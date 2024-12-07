"use client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import DepartmentSelection from "@/components/widgets/department-selection";
import RequisitionApprovalWorkflowSelection from "@/components/widgets/pr-approval-workflow-selection";
import UnitSelection from "@/components/widgets/unit-selection";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { matrixFormSchema, TypeMatrixFormSchema } from "../../page.validators";
import { createApprovalMatrix } from "../../page.actions";

type Props = {
  matrixId?: string;
  defaultValues?: TypeMatrixFormSchema;
};

export default function ApprovalMatrixForm(props: Props) {
  const router = useRouter();

  const form = useForm<TypeMatrixFormSchema>({
    resolver: zodResolver(matrixFormSchema),
    defaultValues: props.defaultValues || {
      name: "",
      description: "",
      minAmount: 0,
      maxAmount: 0,
    },
  });

  async function onSubmit(values: TypeMatrixFormSchema) {
    const isUpdate = !!props.matrixId;

    try {
      if (isUpdate === true) throw new Error("Update is available yet");

      const response = await createApprovalMatrix(values);

      if (!response.id)
        throw new Error(
          `Failded to ${isUpdate ? "update" : "create"} approval matrix`
        );

      toast({
        title: `Approval Matrix ${isUpdate ? "Update" : "Created"}`,
        description: `Your ${
          isUpdate ? "" : "new"
        } approval matrix has been successfully ${
          isUpdate ? "updated" : "created"
        }.`,
      });
      router.push("/procurement/approvals/requisition?tab=matrixes");
    } catch (error: unknown) {
      let errorMsg = `There was a problem  ${
        isUpdate ? "updating" : "creating"
      } the approval matrix.`;

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
          {props.matrixId
            ? "Update Approval Matrix"
            : "Create New Approval Matrix"}
        </CardTitle>
        <CardDescription>
          {props.matrixId
            ? "Modify the existing approval matrix for requisitions"
            : "Set up a new approval matrix for requisitions"}
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrix Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter matrix name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of this approval matrix"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="unitId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Unit{" "}
                      <span className="text-muted-foreground">(Optional)</span>
                    </FormLabel>
                    <UnitSelection
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) =>
                        form.setValue(field.name, value)
                      }
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Department{" "}
                      <span className="text-muted-foreground">(Optional)</span>
                    </FormLabel>
                    <DepartmentSelection
                      name={field.name}
                      value={field.value}
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
              name="workflowId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workflow</FormLabel>
                  <FormDescription>
                    Select the approval workflow for this matrix
                  </FormDescription>
                  <RequisitionApprovalWorkflowSelection
                    name={field.name}
                    value={field.value}
                    onValueChange={(value) => form.setValue(field.name, value)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Set the minimum amount for this matrix
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Set the maximum amount for this matrix
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <CardFooter className="flex justify-between border-t pt-5 pb-0 mt-4 px-0">
              <Button
                variant="outline"
                onClick={() => router.back()}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {form.formState.isSubmitting
                  ? props.matrixId
                    ? "Updating..."
                    : "Creating..."
                  : props.matrixId
                  ? "Update Matrix"
                  : "Create Matrix"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
