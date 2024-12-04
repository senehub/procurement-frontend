import { Department } from "./department";
import { StaffInterface } from "./staffs";

export interface UnitInterface {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  description: string;
  staffsCount: number;
  createdAt: Date;
  updatedAt: Date;
  staffs?: Partial<StaffInterface>[];
  department: Partial<Department>;
  manager: null | Partial<StaffInterface>;
}

export interface UnitDetailInterface extends UnitInterface {
  createdAt: Date;
  updatedAt: Date;
}

export type UnitInterfaceArray = Array<UnitInterface>;
