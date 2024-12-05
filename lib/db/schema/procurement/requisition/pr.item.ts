import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  real,
} from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";
import { z } from "zod";
import { Requisition } from "./pr";
import { Staff } from "../../organization";

export const RequisitionItem = pgTable("requisition_item", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => UUIDv7())
    .notNull(),

  staffId: uuid("staff_id").notNull(),
  requisitionId: uuid("requisition_id").notNull(),

  comment: text("comment").default(""),
  name: varchar("name", { length: 50 }).notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: real("unit_price").notNull().default(0.0),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});

export const RequisitionItemRelations = relations(
  RequisitionItem,
  ({ one }) => {
    return {
      staff: one(Staff, {
        references: [Staff.id],
        fields: [RequisitionItem.staffId],
      }),
      requisition: one(Requisition, {
        references: [Requisition.id],
        relationName: "requisition_items",
        fields: [RequisitionItem.requisitionId],
      }),
    };
  }
);

export const RequisitionItemFormSchema = z.object({
  name: z.string().max(50).min(3),
  quantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
  comment: z.string().max(300),
});

export type TypeRequisitionItemFormSchema = z.infer<
  typeof RequisitionItemFormSchema
>;
