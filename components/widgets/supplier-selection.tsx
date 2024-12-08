"use client";

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type Props = {
  values?: string[];
  onValuesChange: (values?: string[]) => void;
  options?: {
    inputClassName?: string;
    triggerClassName?: string;
  };
};

export default function SupplierSelection(props: Props) {
  const query = useQuery({
    queryKey: ["suppliers-selection"],
    queryFn: async () => [
      { id: 1, name: "Supplier 1" },
      { id: 2, name: "Supplier 2" },
      { id: 3, name: "Supplier 3" },
      { id: 4, name: "Supplier 4" },
      { id: 5, name: "Supplier 5" },
      { id: 6, name: "Supplier 6" },
    ],
  });

  return (
    <MultiSelector
      values={props.values || []}
      onValuesChange={(value) => props.onValuesChange(value)}
    >
      <MultiSelectorTrigger className={cn("", props.options?.triggerClassName)}>
        <MultiSelectorInput
          className={cn("", props.options?.inputClassName)}
          placeholder="Choose"
        />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {query.data?.map((vendor) => {
            return (
              <MultiSelectorItem key={vendor.id} value={vendor.name}>
                {vendor.name}
              </MultiSelectorItem>
            );
          })}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
}
