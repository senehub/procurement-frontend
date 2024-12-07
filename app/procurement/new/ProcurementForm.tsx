"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { useQuery } from "@tanstack/react-query";
import { verifyRequisitionId } from "./page.actions";
import { Loader2 } from "lucide-react";
import { combineFullName, moneyFormatter } from "@/lib/utils";
import { addDays, format, setHours, setMinutes } from "date-fns";
import { DatetimePicker } from "@/components/ui/datetime-picker";

const procurementFormSchema = z.object({
  requisitionId: z.string().uuid("Invalid requisition ID format"),
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  estimatedBudget: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Budget must be a positive number",
    }),
  procurementMethod: z.enum(
    [
      "open",
      "restricted",
      "negotiated",
      "competitive_dialogue",
      "innovation_partnership",
    ],
    {
      required_error: "Please select a procurement method",
    }
  ),
  submissionDeadline: z.date({
    required_error: "Please select a submission deadline",
  }),
  selectedVendors: z
    .array(z.string())
    .min(1, { message: "Please select at least one vendor" }),
});

type ProcurementFormValues = z.infer<typeof procurementFormSchema>;

const vendors = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    category: "IT",
    description: "Provides cutting-edge technology solutions for businesses.",
  },
  {
    id: "2",
    name: "Office Supplies Co.",
    category: "Stationery",
    description:
      "Offers a wide range of office supplies and stationery products.",
  },
  {
    id: "3",
    name: "Industrial Equipment Ltd.",
    category: "Machinery",
    description:
      "Manufactures and supplies heavy machinery for industrial use.",
  },
  {
    id: "4",
    name: "Global Logistics",
    category: "Transportation",
    description:
      "Provides international logistics and transportation services.",
  },
  {
    id: "5",
    name: "Green Energy Systems",
    category: "Renewable Energy",
    description:
      "Specializes in renewable energy solutions and sustainable systems.",
  },
];

export default function ProcurementCreationForm() {
  const router = useRouter();

  const form = useForm<ProcurementFormValues>({
    resolver: zodResolver(procurementFormSchema),
    defaultValues: {
      requisitionId: "",
      title: "",
      description: "",
      estimatedBudget: "",
      procurementMethod: undefined,
      submissionDeadline: undefined,
      selectedVendors: [],
    },
  });

  // async function onSubmit(values: ProcurementFormValues) {
  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast({
      title: "Procurement Initiated",
      description:
        "Your procurement has been successfully created and vendors notified.",
    });
    router.push("/procurement");
  }

  const [requisitionId, setRequisitionId] = useState<string>();

  const requisitionQuery = useQuery({
    enabled: false,
    staleTime: () => 180000, // 3 minutes in milliseconds
    queryKey: [requisitionId],
    queryFn: async () => {
      if (!requisitionId) throw new Error("Please input a requisition id");
      const response = await verifyRequisitionId(requisitionId);
      if (response.error) throw new Error(response.message);
      form.setValue("requisitionId", requisitionId);
      return response.data;
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Procurement Details</CardTitle>
            <CardDescription>
              Enter the basic information for this procurement.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="requisitionId"
              render={({ field }) => (
                <FormItem className=" pb-4">
                  <FormLabel>
                    Requisition ID
                    {requisitionQuery.data && (
                      <>
                        {requisitionQuery.isStale ? (
                          <Badge variant={"destructive"}>
                            Verification Expired
                          </Badge>
                        ) : (
                          <Badge
                            className="text-green-500 ml-4"
                            variant={"outline"}
                          >
                            Verified
                          </Badge>
                        )}
                      </>
                    )}
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4 w-full">
                      <Input
                        disabled={requisitionQuery.isFetching}
                        placeholder="Enter requisition ID"
                        className="flex-1"
                        onBlur={field.onBlur}
                        onChange={(ev) =>
                          setRequisitionId(ev.target.value.trim())
                        }
                      />
                      <Button
                        disabled={requisitionQuery.isFetching}
                        onClick={() => requisitionQuery.refetch()}
                        type="button"
                      >
                        {requisitionQuery.isFetching && (
                          <Loader2 className="animate-spin w-4 h-4 mr-1.5" />
                        )}
                        Verify
                      </Button>
                    </div>
                  </FormControl>
                  {requisitionQuery.data && (
                    <div className="pt-2">
                      <div className="flex space-x-4 bg-muted text-muted-foreground text-sm rounded divide-x border p-2">
                        <strong className="">
                          {moneyFormatter(
                            requisitionQuery.data.items.reduce(
                              (acc, cur) =>
                                (acc += cur.unitPrice * cur.quantity),
                              0
                            )
                          )}
                        </strong>
                        <div className="pl-4">
                          {format(requisitionQuery.data.createdAt, "PP")}
                        </div>
                        <div className="pl-4">
                          {combineFullName(requisitionQuery.data.staff)}
                        </div>
                        <div className="pl-4">
                          {requisitionQuery.data.unit.name}
                          {" / "}
                          {requisitionQuery.data.unit.department.name}
                        </div>
                      </div>
                    </div>
                  )}
                  <FormMessage>{requisitionQuery.error?.message}</FormMessage>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Procurement Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter procurement title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedBudget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Budget</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter estimated budget"
                        {...field}
                      />
                    </FormControl>
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
                  <FormControl>
                    <Textarea
                      placeholder="Enter procurement description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Procurement Method & Timeline</CardTitle>
            <CardDescription>
              Select the procurement method and set the submission deadline.
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-4 grid md:grid-cols-2 pt-4">
            <FormField
              control={form.control}
              name="procurementMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Procurement Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a procurement method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="open">Open Procedure</SelectItem>
                      <SelectItem value="restricted">
                        Restricted Procedure
                      </SelectItem>
                      <SelectItem value="negotiated">
                        Negotiated Procedure
                      </SelectItem>
                      <SelectItem value="competitive_dialogue">
                        Competitive Dialogue
                      </SelectItem>
                      <SelectItem value="innovation_partnership">
                        Innovation Partnership
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="submissionDeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Submission Deadline</FormLabel>
                  <FormControl>
                    <DatetimePicker
                      value={
                        field.value ||
                        setMinutes(setHours(addDays(new Date(), 25), 12), 0)
                      }
                      format={[
                        ["days", "months", "years"],
                        ["hours", "minutes", "am/pm"],
                      ]}
                      dtOptions={{
                        minDate: new Date(),
                      }}
                      className="w-full justify-evenly"
                      onChange={(date) => field.onChange(date || field.value)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Select Vendors</CardTitle>
            <CardDescription>
              Choose the vendors to invite for this procurement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <ScrollArea className="h-[200px] rounded-md border p-4"> */}
            <FormField
              control={form.control}
              name="selectedVendors"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={(value) => field.onChange(value)}
                    >
                      <MultiSelectorTrigger className="min-h-[50px] border px-2">
                        <MultiSelectorInput
                          className="placeholder:text-sm"
                          placeholder="Choose"
                        />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {vendors.map((vendor) => {
                            return (
                              <MultiSelectorItem
                                key={vendor.id}
                                value={vendor.name}
                              >
                                {vendor.name}
                              </MultiSelectorItem>
                            );
                          })}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* </ScrollArea> */}
            <FormMessage className="mt-2">
              {form.formState.errors.selectedVendors?.message}
            </FormMessage>
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full"
          size={"lg"}
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Initiating Procurement..."
            : "Initiate Procurement"}
        </Button>
      </form>
    </Form>
  );
}
