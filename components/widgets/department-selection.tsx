"use client";

import { getDepartments } from "@/app/organization/departments/page.actions";
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

export default function DepartmentSelection(props: Props) {
  const query = useQuery({
    queryKey: ["departments-selection"],
    queryFn: async () => getDepartments(),
  });

  return (
    <Select
      name={props.name}
      value={props.value?.toString()}
      onValueChange={props.onValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder || "Choose a department"} />
      </SelectTrigger>
      <SelectContent className="min-h-24">
        {query.data?.departments.map((department) => (
          <SelectItem
            key={department.id}
            className="capitalize"
            value={department.id}
          >
            {department.name}
          </SelectItem>
        ))}
        {query.data && query.data?.count === 0 && (
          <div className="h-24 flex items-center justify-center text-center">
            <span>No Departments</span>
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
