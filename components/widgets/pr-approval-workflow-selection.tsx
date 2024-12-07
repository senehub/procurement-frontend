"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { getApprovalWorkflows } from "@/app/procurement/approvals/requisition/page.actions";

type Props = {
  name: string;
  placeholder?: string;
  value?: string | null;
  onValueChange: (value: string) => void;
};

export default function RequisitionApprovalWorkflowSelection(props: Props) {
  const query = useQuery({
    queryKey: ["approval-workflows-selection"],
    queryFn: async () => getApprovalWorkflows(),
  });

  return (
    <Select
      name={props.name}
      value={props.value?.toString()}
      onValueChange={props.onValueChange}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={props.placeholder || "Choose a approval workflow"}
        />
      </SelectTrigger>
      <SelectContent className="min-h-24">
        {query.data?.map((approvalStep) => (
          <SelectItem
            key={approvalStep.id}
            className="capitalize"
            value={approvalStep.id}
          >
            {approvalStep.name}
          </SelectItem>
        ))}
        {query.data && query.data?.length === 0 && (
          <div className="h-24 flex items-center justify-center text-center">
            <span>No Approval Step</span>
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
