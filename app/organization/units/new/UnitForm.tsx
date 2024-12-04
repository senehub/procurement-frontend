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
  TypeUnitFormSchema,
  UnitFormSchema,
} from "@/lib/db/schema/organization/units";
import { Textarea } from "@/components/ui/textarea";
import StaffSelection from "@/components/widgets/staff-selection";
import { useToast } from "@/hooks/use-toast";
import DepartmentSelection from "@/components/widgets/department-selection";
import { createUnit, updateUnit } from "../page.actions";

type Props = {
  unitId?: string;
  defaultValues?: TypeUnitFormSchema;
};

export default function UnitForm(props: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TypeUnitFormSchema>({
    resolver: zodResolver(UnitFormSchema),
    defaultValues: props.defaultValues,
  });

  async function handleSubmit(data: TypeUnitFormSchema) {
    try {
      let response;
      if (props.unitId) {
        response = await updateUnit(props.unitId, data);
      } else {
        response = await createUnit(data);
      }
      if (response?.id) {
        toast({
          title: `Unit ${
            props.defaultValues ? "Updated" : "Added"
          } Successully`,
          description: format(new Date(), "PPPp"),
        });
        return router.replace(`/organization/units/${response.id}`);
      }
      throw new Error("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Error! ${props.defaultValues ? "Updating" : "Adding"}  Unit`,
        description: format(new Date(), "PPPp"),
      });
      console.error(error);
    }
  }

  return (
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
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <DepartmentSelection
                  name={field.name}
                  value={field.value}
                  placeholder="Choose a department"
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
            {props.defaultValues ? "Update Staff" : "Add Staff"}
          </ActionButton>
        </div>
      </form>
    </Form>
  );
}
