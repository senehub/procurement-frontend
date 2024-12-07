"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSupplier } from "./page.actiions";
import { supplierFormSchema, TypeSupplierFormSchema } from "./page.zod";

// import { Progress } from "@/components/ui/progress";

const steps = [
  { title: "Company Information", fields: ["name", "description"] },
  {
    title: "Contact Details",
    fields: ["address", "contactPhone", "contactEmail", "website"],
  },
  { title: "Financial Information", fields: ["taxId", "paymentTerms"] },
];

type Props = {
  emailAddress: string;
};

export default function SupplierOnboardingForm(props: Props) {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const form = useForm<TypeSupplierFormSchema>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      contactPhone: "",
      contactEmail: props.emailAddress,
      website: "",
      taxId: "",
      paymentTerms: "",
    },
  });

  async function onSubmit(values: TypeSupplierFormSchema) {
    try {
      const response = await createSupplier(values);
      if (response.error) throw new Error(response.message);
      toast({
        title: "Profile Completed",
        description: "Your supplier profile has been successfully created.",
      });
      router.replace("/dashboard");
    } catch (error) {
      let description = "Error! Try again later";

      if (error instanceof Error) description = error.message;
      toast({
        description,
        title: "Error!",
        variant: "destructive",
      });
    }
  }

  const currentStepFields = steps[step].fields;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{steps[step].title}</CardTitle>
        <CardDescription>
          Step {step + 1} of {steps.length}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* <Progress value={((step + 1) / steps.length) * 100} className="mb-4" /> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStepFields.includes("name") && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStepFields.includes("description") && (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Briefly describe your company and services"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This description will be visible to procurement officers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStepFields.includes("address") && (
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your business address"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStepFields.includes("contactPhone") && (
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter contact phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStepFields.includes("contactEmail") && (
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter contact email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStepFields.includes("website") && (
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://www.example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStepFields.includes("taxId") && (
              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your tax ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {currentStepFields.includes("paymentTerms") && (
              <FormField
                control={form.control}
                name="paymentTerms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Terms</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment terms" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="net30">Net 30</SelectItem>
                        <SelectItem value="net60">Net 60</SelectItem>
                        <SelectItem value="net90">Net 90</SelectItem>
                        <SelectItem value="immediate">Immediate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={form.formState.isSubmitting || step === 0}
        >
          Previous
        </Button>
        <Button
          onClick={async () => {
            const currentValues = form.getValues();
            const currentErrors = form.formState.errors;

            let validationError = false;
            // Use a single loop to find the first error
            for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
              const step = steps[stepIndex];
              for (const field of step.fields) {
                const fieldName = field as keyof typeof currentValues;
                const value = currentValues[fieldName];
                if (currentErrors[fieldName] && !value) {
                  setStep(stepIndex); // Set the step to the index of the first error
                  await form.trigger(fieldName);
                  validationError = true;
                  break; // Exit the inner loop
                }
              }
              if (validationError) break; // Exit the outer loop if an error was found
            }

            if (validationError) return;

            // Validate current step fields
            const isCurrentStepValid = await form.trigger(
              ...(currentStepFields as (keyof typeof currentValues)[])
            );

            if (isCurrentStepValid) {
              form.clearErrors();
              if (step < steps.length - 1) {
                setStep(step + 1);
              } else {
                form.handleSubmit(onSubmit)();
              }
            } else {
              await form.trigger();
              toast({
                title: "Validation Error",
                variant: "destructive",
                description:
                  "Please correct the errors in the current step before proceeding.",
              });
            }
          }}
          disabled={form.formState.isSubmitting}
        >
          {step < steps.length - 1
            ? "Next"
            : form.formState.isSubmitting
            ? "Submitting..."
            : "Complete Profile"}
        </Button>
      </CardFooter>
    </Card>
  );
}
