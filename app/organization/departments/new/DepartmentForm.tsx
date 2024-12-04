"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormMessage,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";
import ActionButton from "@/components/ui/action-button";
import {
  TypeDepartmentFormSchema,
  DepartmentFormSchema,
} from "@/lib/db/schema/organization/department";
import { Textarea } from "@/components/ui/textarea";
import StaffSelection from "@/components/widgets/staff-selection";
import { useToast } from "@/hooks/use-toast";
import { createDepartment, updateDepartment } from "../page.actions";

type Props = {
  departmentId?: string;
  defaultValues?: TypeDepartmentFormSchema;
};

export default function DepartmentForm(props: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TypeDepartmentFormSchema>({
    resolver: zodResolver(DepartmentFormSchema),
    defaultValues: props.defaultValues,
  });

  async function handleSubmit(data: TypeDepartmentFormSchema) {
    try {
      let response;

      if (props.departmentId) {
        response = await updateDepartment(props.departmentId, data);
      } else {
        response = await createDepartment(data);
      }

      if (response?.id) {
        toast({
          title: `Department ${
            props.departmentId ? "Updated" : "Added"
          } Successully`,
          description: format(new Date(), "PPPp"),
        });
        return router.replace(`/organization/departments/${response.id}`);
      }
      throw new Error("");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: `Error! ${
          props.departmentId ? "Updating" : "Adding"
        } Department`,
        description: format(new Date(), "PPPp"),
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="phone number"
                    {...field}
                    value={(field.value || "").toString()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="managerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mahaner</FormLabel>
                <FormControl>
                  <StaffSelection
                    name={field.name}
                    value={field.value}
                    placeholder="Select manager"
                    onValueChange={(value) => form.setValue(field.name, value)}
                  />
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
                    placeholder="select manager"
                    {...field}
                    value={(field.value || "").toString()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full pt-6 flex justify-center">
            <ActionButton
              type="submit"
              disabled={!form.formState.isDirty}
              className="mx-max max-w-[400px] w-full"
            >
              {props.departmentId ? "Update Department" : "Add Department"}
            </ActionButton>
          </div>
        </form>
      </Form>
    </>
  );
}
