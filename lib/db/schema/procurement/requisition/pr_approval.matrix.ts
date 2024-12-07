import { relations } from "drizzle-orm";
import {
  pgTable,
  real,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";
import { z } from "zod";
import { Department, Unit } from "../../organization";
import { RequisitionApprovalWorkflow } from "./pr_approval.workflow";

export const RequisitionApprovalMatrix = pgTable(
  "requisition_approval_matrix",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => UUIDv7())
      .notNull(),

    unitId: uuid("unit_id"),
    departmentId: uuid("department_id"),

    workflowId: uuid("workflow_id").notNull(),

    name: varchar("name", { length: 80 }).notNull(),
    description: text("description").default("").notNull(),

    minAmount: real("min_amount").notNull(),
    maxAmount: real("max_amount").notNull(),

    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
      .notNull(),
  }
);

export const RequisitionApprovalMatrixRelations = relations(
  RequisitionApprovalMatrix,
  ({ one }) => {
    return {
      unit: one(Unit, {
        references: [Unit.id],
        fields: [RequisitionApprovalMatrix.unitId],
      }),
      department: one(Department, {
        references: [Department.id],
        fields: [RequisitionApprovalMatrix.departmentId],
      }),
      workflow: one(RequisitionApprovalWorkflow, {
        references: [RequisitionApprovalWorkflow.id],
        fields: [RequisitionApprovalMatrix.workflowId],
      }),
    };
  }
);

export const RequisitionApprovalMatrixFormSchema = z
  .object({
    name: z.string().min(5),
    description: z.string().max(300).default(""),
    minAmount: z.number().positive().min(0),
    maxAmount: z.number().positive().max(Infinity),
  })
  .refine((data) => data.minAmount <= data.maxAmount, {
    path: ["minAmount"],
    message: "minAmount must be less than or equal to maxAmount",
  });
