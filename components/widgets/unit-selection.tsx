"use client";

import { getUnits } from "@/app/organization/units/page.actions";
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

export default function UnitSelection(props: Props) {
  const query = useQuery({
    staleTime: Infinity,
    queryKey: ["units-selection"],
    queryFn: async () => getUnits(),
  });

  return (
    <Select
      name={props.name}
      value={props.value?.toString()}
      onValueChange={props.onValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={props.placeholder || "Choose a unit"} />
      </SelectTrigger>
      <SelectContent className="min-h-24">
        {query.data?.units.map((unit) => (
          <SelectItem key={unit.id} className="capitalize" value={unit.id}>
            {unit.name}
          </SelectItem>
        ))}
        {query.data && query.data?.count === 0 && (
          <div className="h-24 flex items-center justify-center text-center">
            <span>No Units</span>
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
