import { UnitInterface } from "./unit";

export interface StaffInterface {
  id: string;
  phone: string | null;
  avatar: string | null;
  middleName: string | null;
  lastName: string;
  firstName: string;
  position: string;
  isActive: boolean;
  updatedAt: Date;
  unit: Partial<UnitInterface>;
  gender: "male" | "female" | "other" | null;
}

export interface StaffDetailInterface extends StaffInterface {
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export type StaffInterfaceArray = Array<StaffInterface>;
