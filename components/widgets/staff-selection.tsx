"use client";

import { getStaffs } from "@/app/organization/staffs/page.actions";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../ui/select";

type Props = {
  name: string;
  placeholder?: string;
  value?: string | null;
  onValueChange: (value: string) => void;
};

export default function StaffSelection(props: Props) {
  const query = useQuery({
    staleTime: Infinity,
    queryKey: ["staffs-selection"],
    queryFn: async () => getStaffs(),
  });

  return (
    <Select
      name={props.name}
      value={props.value?.toString()}
      onValueChange={props.onValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder || "Choose a staff"} />
      </SelectTrigger>
      <SelectContent className="min-h-24">
        {query.data?.staffs.map((staff) => (
          <SelectItem key={staff.id} className="capitalize" value={staff.id}>
            {staff.firstName} {staff.middleName} {staff.lastName}
          </SelectItem>
        ))}
        {query.data && query.data?.count === 0 && (
          <div className="h-24 flex items-center justify-center text-center">
            <span>No Staffs</span>
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
