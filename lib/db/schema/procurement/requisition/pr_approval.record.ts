import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";
import { Requisition } from "./pr";
import { Staff } from "../../organization";
import { z } from "zod";

export const RequisitionApprovalRecord = pgTable(
  "requisition_approval_record",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => UUIDv7())
      .notNull(),

    staffId: uuid("staff_id").notNull(),
    requisitionId: uuid("requisition_id").notNull(),

    approvalStepId: uuid("approval_step_id").notNull(),

    comment: text("comment").default(""),
    approval: text("priority", { enum: ["pending", "accepted", "declined"] })
      .notNull()
      .default("pending"),

    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
      .notNull(),
  }
);

export const RequisitionApprovalRelations = relations(
  RequisitionApprovalRecord,
  ({ one }) => {
    return {
      staff: one(Staff, {
        references: [Staff.id],
        fields: [RequisitionApprovalRecord.staffId],
      }),
      requisition: one(Requisition, {
        relationName: "approval_records",
        references: [Requisition.id],
        fields: [RequisitionApprovalRecord.requisitionId],
      }),
    };
  }
);

export const RequisitionApprovalRecordFormSchema = z.object({
  comment: z.string().max(300),
  approval: z.enum(["pending", "accepted", "declined"]).default("pending"),
});
