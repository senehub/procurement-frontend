import { StaffInterface } from "../organization/staffs";
import { UnitInterface } from "../organization/unit";

export interface RequisitionInterface {
  id: string;

  title: string | null;
  comment: string;
  priority: "high" | "medium" | "low";

  staff: Partial<StaffInterface>;
  unit: Partial<UnitInterface>;

  items: Partial<RequisitionItemInterface>[];

  createdAt: Date;
  updatedAt: Date;
}
export type RequisitionInterfaceArray = Array<RequisitionInterface>;

export interface RequisitionDetailInterface extends RequisitionInterface {
  items: RequisitionItemInterfaceArray;
}

// ==================== Requisition Items ========================= //

export interface RequisitionItemInterface {
  id: string;

  name: string;
  comment: string | null;
  quantity: number;
  unitPrice: number;

  staff?: Partial<StaffInterface>;
  requisition?: Partial<RequisitionInterface>;

  createdAt?: Date;
  updatedAt?: Date;
}
export type RequisitionItemInterfaceArray = Array<RequisitionItemInterface>;

export interface RequisitionItemDetailInterface
  extends RequisitionItemInterface {
  comment: string;
}
