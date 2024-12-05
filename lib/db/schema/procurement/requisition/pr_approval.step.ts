import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";
import { z } from "zod";

/**
 * The approval-step in of this application
 */
export const RequisitionApprovalStep = pgTable("requisiton_approval_steps", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => UUIDv7())
    .notNull(),

  // The approver
  staffId: uuid("staff_id").notNull(),

  name: varchar("description", { length: 50 }).notNull(),
  // The description about this step
  description: text("description").default("").notNull(),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});

export const RequisitionApprovalWorkflowFormSchema = z.object({
  staffId: z.string().uuid(),
  name: z.string().max(300).min(5),
  description: z.string().max(300).default(""),
});
