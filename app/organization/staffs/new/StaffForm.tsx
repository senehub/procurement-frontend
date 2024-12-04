"use client";
import React from "react";
import {
  Form,
  FormMessage,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import ActionButton from "@/components/ui/action-button";
import {
  TypeStaffFormSchema,
  StaffFormSchema,
} from "@/lib/db/schema/organization/staffs";
import { createStaff, updateStaff } from "../page.actions";
import Gender from "@/components/ui/gender";
import UnitSelection from "@/components/widgets/unit-selection";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/dist/client/components/navigation";
import { format } from "date-fns";

type Props = {
  staffId?: string;
  defaultValues?: TypeStaffFormSchema;
};

export default function StaffForm(props: Props) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TypeStaffFormSchema>({
    resolver: zodResolver(StaffFormSchema),
    defaultValues: props.defaultValues,
  });

  async function handleSubmit(data: TypeStaffFormSchema) {
    try {
      let response;

      if (props.staffId) {
        response = await updateStaff(props.staffId, data);
      } else {
        response = await createStaff(data);
      }

      if (response?.id) {
        toast({
          title: `Staff ${props.staffId ? "Updated" : "Added"} Successully`,
          description: format(new Date(), "PPPp"),
        });
        return router.replace(`/organization/staffs/${response.id}`);
      }
      throw new Error("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Error! ${props.staffId ? "Updating" : "Adding"} Staff`,
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
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Middle Name"
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
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <UnitSelection
                  name={field.name}
                  value={field.value}
                  onValueChange={(value) => {
                    form.setValue(field.name, value);
                    // form.formState.dirtyFields[field.name] = !!value;
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Gender
                  name={field.name}
                  value={field.value}
                  onValueChange={(value) => {
                    form.setValue(field.name, value);
                    // form.trigger(field.name)
                  }}
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
            {props.staffId ? "Update Staff" : "Add Staff"}
          </ActionButton>
        </div>
      </form>
    </Form>
  );
}
