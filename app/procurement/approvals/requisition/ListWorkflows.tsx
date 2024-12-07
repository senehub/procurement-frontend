"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Search } from "lucide-react";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { getApprovalWorkflows } from "./page.actions";

export default function RequisitionApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const [queryKey] = useState<QueryKey>(["workflows"]);

  const query = useQuery({
    queryKey,
    queryFn: async () => getApprovalWorkflows(),
  });

  return (
    <>
      <div className="mb-4 max-w-2xl mx-auto flex items-center gap-4 flex-wrap">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search approval workflows..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Link href={"/procurement/approvals/requisition/new/workflow"}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Workflow
          </Button>
        </Link>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {query.data?.map((workflow) => (
          <Card key={workflow.id} className="p-2">
            <AccordionItem value={workflow.id} className="border-0">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex justify-between w-full pl-4">
                  <div className="">
                    <span className="font-medium">{workflow.name}</span>
                    <p className="text-sm text-muted-foreground pt-0.5">
                      {workflow.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 pr-4">
                    <Badge variant="secondary" className="uppercase">
                      {workflow.workflowType}
                    </Badge>
                    <Badge variant="outline">
                      {workflow.steps.length} Steps
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-2 space-y-2">
                  <Table className="text-sm">
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>
                        <TableHead>Approval Step</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Approver</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {workflow.steps
                        .sort((a, b) => a.stepOrder - b.stepOrder)
                        .map((step, index) => (
                          <TableRow key={step.id}>
                            <TableCell className="text-muted-foreground">
                              <small>{index + 1}.</small>
                            </TableCell>
                            <TableCell>{step.step.name}</TableCell>
                            <TableCell>{step.stepOrder}</TableCell>
                            <TableCell>
                              <span className="inline-block">
                                {step.step.staff.firstName}{" "}
                                {step.step.staff.middleName}{" "}
                                {step.step.staff.lastName}{" "}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="rounded"
                              >
                                <Link
                                  href={`/procurement/approvals/requisitions/steps/${step.id}/edit`}
                                >
                                  Edit
                                </Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <div className="flex justify-center mt-4">
                    <Link
                      href={`/procurement/approvals/requisition/workflow/${workflow.id}/edit`}
                    >
                      <Button variant="outline" size="sm">
                        Edit Workflow
                      </Button>
                    </Link>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Card>
        ))}
      </Accordion>
    </>
  );
}
