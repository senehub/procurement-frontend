"use client";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "./select";

type Props = {
  name: string;
  placeholder?: string;
  value?: string | null;
  onValueChange: (value: (typeof genders)[number]) => void;
};

const genders = ["male", "female", "other"] as const;

export default function Gender(props: Props) {
  return (
    <Select
      name={props.name}
      value={props.value?.toString()}
      onValueChange={props.onValueChange}
    >
      <SelectTrigger className="uppercase">
        <SelectValue placeholder={props.placeholder || "Select a gender"} />
      </SelectTrigger>
      <SelectContent>
        {genders.map((gender) => (
          <SelectItem key={gender} className="capitalize" value={gender}>
            {gender}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
