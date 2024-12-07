"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import RequisitionApprovalStepSelection from "@/components/widgets/pr-approval-step-selection";
import {
  TypeWorkflowFormSchema,
  workflowFormSchema,
} from "../../page.validators";
import { createApprovalWorkflow } from "../../page.actions";

type Props = {
  workflowId?: string;
  defaultValues?: TypeWorkflowFormSchema;
};

export default function ApprovalWorkflowForm(props: Props) {
  const router = useRouter();

  const form = useForm<TypeWorkflowFormSchema>({
    resolver: zodResolver(workflowFormSchema),
    defaultValues: props.defaultValues || {
      name: "",
      description: "",
      workflowType: "sequential",
      steps: [{ stepId: "", stepOrder: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "steps",
  });

  async function onSubmit(values: TypeWorkflowFormSchema) {
    const isUpdate = !!props.workflowId;

    try {
      if (isUpdate === true) throw new Error("Update is available yet");

      const response = await createApprovalWorkflow(values);

      if (!response.id)
        throw new Error(
          `Failded to ${isUpdate ? "update" : "create"} approval workflow`
        );

      toast({
        title: "Workflow Created",
        description: `Your ${
          isUpdate ? "" : "new"
        } workflow has been successfully ${isUpdate ? "updated" : "created"}.`,
      });
      router.push("/procurement/approvals/requisition?tab=workflows");
    } catch (error: unknown) {
      let errorMsg = `There was a problem ${
        isUpdate ? "updating" : "creating"
      } the workflow.`;

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
          {props.workflowId ? "Update Workflow" : "Create New Workflow"}
        </CardTitle>
        <CardDescription>
          {props.workflowId
            ? "Modify the existing workflow for requisition approvals"
            : "Set up a new workflow for requisition approvals"}
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
                  <FormLabel>Workflow Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workflow name" {...field} />
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
                  <FormLabel>
                    Description{" "}
                    <span className="text-muted-foreground">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a brief description of this workflow..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workflowType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workflow Type</FormLabel>
                  <FormDescription>
                    Choose the execution type of this workflow
                  </FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select workflow type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="sequential">Sequential</SelectItem>
                      <SelectItem value="parallel">Parallel</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h3 className="text-lg font-medium mb-4">
                Approval Steps{" "}
                <span className="text-muted-foreground">({fields.length})</span>{" "}
              </h3>
              {fields.map((field, index) => (
                <Card key={field.id} className="mb-4 p-3">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`steps.${index}.stepId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Approvel Step</FormLabel>
                            <FormControl>
                              <RequisitionApprovalStepSelection
                                name={field.name}
                                value={field.value}
                                placeholder="Select an approvel step"
                                onValueChange={(value) =>
                                  form.setValue(field.name, value)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`steps.${index}.stepOrder`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Order</FormLabel>
                            <FormControl>
                              <Input
                                min="1"
                                type="number"
                                placeholder="workflow execution order"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="mt-4"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Step
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
              <div className="flex justify-center">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    append({
                      stepId: "",
                      stepOrder: fields.length + 1,
                    })
                  }
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Approval Step
                </Button>
              </div>
            </div>
            <CardFooter className="flex justify-between border-t pt-5 pb-0 mt-4 px-0">
              <Button
                disabled={form.formState.isSubmitting}
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {form.formState.isSubmitting
                  ? props.workflowId
                    ? "Updating..."
                    : "Creating..."
                  : props.workflowId
                  ? "Update Workflow"
                  : "Create Workflow"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
