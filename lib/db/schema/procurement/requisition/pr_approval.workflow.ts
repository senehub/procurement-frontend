import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";
import { z } from "zod";
import { RequisitionApprovalWorkflowStep } from "./pr_approval.workflow.step";

export const RequisitionApprovalWorkflow = pgTable(
  "requisiton_approval_workflows",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => UUIDv7())
      .notNull(),

    name: varchar("name", { length: 80 }).notNull(),
    description: text("description").default("").notNull(),

    stepsCount: integer("steps_count").default(1).notNull(),

    workflowType: text("workflow_type", { enum: ["sequential", "parallel"] })
      .default("sequential")
      .notNull(),

    createdAt: timestamp("created_at")
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date())
      .notNull(),
  }
);

export const RequisitionApprovalWorkflowRelations = relations(
  RequisitionApprovalWorkflow,
  ({ many }) => {
    return {
      steps: many(RequisitionApprovalWorkflowStep, {
        relationName: "workflow_steps",
      }),
    };
  }
);

export const RequisitionApprovalWorkflowFormSchema = z.object({
  name: z.string().min(5),
  description: z.string().max(300).default(""),
});
// .refine((data) => data.minAmount <= data.maxAmount, {
//   path: ["minAmount"],
//   message: "minAmount must be less than or equal to maxAmount",
// });
