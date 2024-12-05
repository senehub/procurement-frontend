import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";
import { z } from "zod";
import { Staff, Unit } from "../../organization";
import { RequisitionItem, RequisitionItemFormSchema } from "./pr.item";

export const Requisition = pgTable("requisitions", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => UUIDv7())
    .notNull(),
  staffId: uuid("staff_id").notNull(),
  staffUnitId: uuid("staff_unit_id").notNull(),

  approvalWorkflowId: uuid("approval_workflow_id"),

  title: varchar("title", { length: 50 }),
  comment: text("comment")
    .$defaultFn(() => "")
    .notNull(),
  priority: text("priority", { enum: ["low", "medium", "high"] })
    .notNull()
    .default("medium"),

  status: text("status", { enum: ["pending", "accepted", "declined"] })
    .notNull()
    .default("pending"),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});

export const RequisitionRelations = relations(Requisition, ({ one, many }) => {
  return {
    items: many(RequisitionItem, {
      relationName: "requisition_items",
    }),
    unit: one(Unit, {
      fields: [Requisition.staffUnitId],
      references: [Unit.id],
    }),
    staff: one(Staff, {
      fields: [Requisition.staffId],
      references: [Staff.id],
    }),
  };
});

export const RequisitionFormSchema = z.object({
  comment: z.string().max(300),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  status: z.enum(["pending", "accepted", "declined"]).default("pending"),
  title: z.string().max(50).nullish(),
  items: z
    .array(RequisitionItemFormSchema)
    .min(1, "At least one item is required"),
});

export type TypeRequisitionFormSchema = z.infer<typeof RequisitionFormSchema>;
