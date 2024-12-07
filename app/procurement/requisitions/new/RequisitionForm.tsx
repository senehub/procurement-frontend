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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  RequisitionFormSchema,
  TypeRequisitionFormSchema,
} from "@/lib/db/schema/procurement/requisition/pr";
import { createRequisition, updateRequisition } from "../page.actions";
import { Separator } from "@/components/ui/separator";

type Props = {
  requisitionId?: string;
  defaultValues?: TypeRequisitionFormSchema;
};

export default function RequisitionForm(props: Props) {
  const router = useRouter();

  const form = useForm<TypeRequisitionFormSchema>({
    resolver: zodResolver(RequisitionFormSchema),
    defaultValues: props.defaultValues || {
      title: "",
      comment: "",
      priority: "medium",
      items: [{ name: "", quantity: 1, unitPrice: 0, comment: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  async function onSubmit(data: TypeRequisitionFormSchema) {
    let response;

    try {
      if (!!props.requisitionId === true)
        throw new Error("Update is not implemented");

      if (props.requisitionId) {
        response = await updateRequisition(props.requisitionId, data);
      } else {
        response = await createRequisition(data);
      }

      if (!response?.id)
        throw new Error(
          `Error! ${props.requisitionId ? "updating" : "creating"} requisition`
        );
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
      toast({
        title: `Requisition ${props.requisitionId ? "Updated" : "Created"}`,
        description: "Your requisition has been successfully submitted.",
      });
      router.push("/procurement/requisitions");
    } catch (error: unknown) {
      let errorMessage = `There was a problem ${
        props.requisitionId ? "updating" : "creating"
      } your requisition.`;

      if (error instanceof Error) errorMessage = error.message;

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      // setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-[900px] mx-auto">
      <Card className="bg-card/30 max-sm:p-2 p-0">
        <CardHeader className="p-4">
          <CardTitle>
            {props.requisitionId
              ? "Update Requisition"
              : "Create New Requisition"}
          </CardTitle>
          <CardDescription>
            {props.requisitionId
              ? "Update the form below to update the requisition."
              : "Fill out the form below to create a new requisition."}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <Card>
                <CardContent className="pt-4 space-y-6">
                  <div className="grid gap-y-6 gap-x-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requisition Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || "PR Request"}
                              placeholder="Enter requisition title"
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormDescription>
                          Provide additional details about the requisition.
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Enter requisition description"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="pb-6">
                <div className="my-4">
                  <h3 className="text-lg font-medium text-center">
                    Items{" "}
                    <strong className="text-muted-foreground">
                      ({form.getValues("items").length})
                    </strong>
                  </h3>
                  <p className="text-xs text-center text-muted-foreground">
                    Add or remove items as needed.
                  </p>
                </div>
                {fields.map((field, index) => (
                  <Card key={field.id} className="mb-2 p-0">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter item name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
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
                        <FormField
                          control={form.control}
                          name={`items.${index}.unitPrice`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Unit Price</FormLabel>
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
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`items.${index}.comment`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Description</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter item description"
                                  {...field}
                                  value={(field.value || "").toString()}
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
                          Remove Item
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
                    className="mt-2"
                    onClick={() =>
                      append({
                        name: "",
                        quantity: 1,
                        unitPrice: 0,
                        comment: "",
                      })
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </div>
              <CardFooter className="flex justify-between border-t p-4">
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
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                  )}
                  {form.formState.isSubmitting
                    ? "Submitting..."
                    : props.requisitionId
                    ? "Update Requisition"
                    : "Create Requisition"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// "use client";
// import { format } from "date-fns";
// import { useRouter } from "next/dist/client/components/navigation";
// import React from "react";
// import { useForm } from "react-hook-form";

// import ActionButton from "@/components/ui/action-button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import {
//   RequisitionFormSchema,
//   TypeRequisitionFormSchema,
// } from "@/lib/db/schema/procurement/requisition/pr";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createRequisition, updateRequisition } from "../page.actions";

// type Props = {
//   requisitionId?: string;
//   defaultValues?: TypeRequisitionFormSchema;
// };

// export default function RequisitionForm(props: Props) {
//   const router = useRouter();
//   const { toast } = useToast();

//   const form = useForm<TypeRequisitionFormSchema>({
//     resolver: zodResolver(RequisitionFormSchema),
//     defaultValues: props.defaultValues,
//   });

//   async function handleSubmit(data: TypeRequisitionFormSchema) {
//     try {
//       let response;

//       if (props.requisitionId) {
//         response = await updateRequisition(props.requisitionId, data);
//       } else {
//         response = await createRequisition(data);
//       }

//       if (response?.id) {
//         toast({
//           title: `Requisition ${
//             props.requisitionId ? "Updated" : "Added"
//           } Successully`,
//           description: format(new Date(), "PPPp"),
//         });
//         return router.replace(`/organization/requisitions/${response.id}`);
//       }
//       throw new Error("");
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: `Error! ${
//           props.requisitionId ? "Updating" : "Adding"
//         } Requisition`,
//         description: format(new Date(), "PPPp"),
//       });
//       console.error(error);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="give your request a title"
//                   {...field}
//                   value={(field.value || "").toString()}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="comment"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Comment</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="comment..."
//                   {...field}
//                   value={(field.value || "").toString()}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="w-full pt-6 flex justify-center">
//           <ActionButton
//             type="submit"
//             disabled={!form.formState.isDirty}
//             className="mx-max max-w-[400px] w-full"
//           >
//             {props.requisitionId ? "Update Requisition" : "Add Requisition"}
//           </ActionButton>
//         </div>
//       </form>
//     </Form>
//   );
// }
