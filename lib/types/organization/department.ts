import { StaffInterface, StaffInterfaceArray } from "./staffs";
import { UnitInterfaceArray } from "./unit";

export interface Department {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  description: string | null;
  staffsCount: number;
  createdAt: Date;
  updatedAt: Date;
  unitsCount: number;

  manager: null | {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string | null;
    avatar: string | null;
  };
}

export interface DepartmentDetail {
  id: string;
  name: string;
  description: string;
  manager?: StaffInterface;
  units: UnitInterfaceArray;
  staffs: StaffInterfaceArray;
  annualPlan: unknown;
}

export type DepartmentArray = Array<Department>;
