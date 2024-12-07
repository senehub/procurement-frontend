"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createIntitation } from "./page.actions";

const formSchema = z.object({
  emailAddress: z.string().email(),
  lastName: z.string().max(50).optional(),
  firstName: z.string().max(50).optional(),
  expiry: z.string().refine((value) => {
    if (isNaN(parseInt(value))) return false;

    if (parseInt(value) > 60) return false;

    if (parseInt(value) <= 0) return false;

    return true;
  }, "Expiry data must be a positive integer (1-60)"),
});

export default function CreateInvitation() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await createIntitation({
        emailAddress: data.emailAddress,
        firstName: data.firstName!,
        lastName: data.lastName!,
      });
      if (response.error) throw new Error(response.message);
      form.reset();
      toast({
        title: `Invitation Sent`,
        description: "Your invitaion is successfully sent.",
      });
      setIsOpen(false);
    } catch (error: unknown) {
      let errorMessage = `There was a problem sending your invitation`;
      if (error instanceof Error) errorMessage = error.message;
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>New Invitation</Button>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden rounded">
        <DialogHeader className="p-4 bg-accent border-b">
          <DialogTitle>Invite Supplier</DialogTitle>
          <DialogDescription>
            Invite suppliers to join your system
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="px-4 pb-5 space-y-6">
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="name@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid sm:grid-cols-2 gap-x-2 gap-y-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="optional" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />{" "}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="optional" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-1">
                        <FormLabel>Set invitation Expiry</FormLabel>
                        <p className="text-xs text-muted-foreground">
                          Invite links will expire after the specified number of
                          days
                        </p>
                      </div>
                      <FormControl className="flex">
                        <div className="flex items-center border h-[35px] divide-x w-max rounded-sm overflow-hidden">
                          <Input
                            type="number"
                            min={1}
                            max={60}
                            {...field}
                            value={field.value || "7"}
                            className="appearance-none text-center text-lg w-[7ch] h-full pr-0 pl-2 py-0 rounded-none border-0 focus:border-0 focus-visible:ring-0 focus:outline-none"
                          />
                          <span className="inline-flex items-center justify-center h-full px-2 bg-accent text-accent-foreground">
                            Days
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="p-4 bg-accent border-t">
                <Button
                  disabled={form.formState.isSubmitting}
                  className="rounded-sm"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  )}
                  Send Invite
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
