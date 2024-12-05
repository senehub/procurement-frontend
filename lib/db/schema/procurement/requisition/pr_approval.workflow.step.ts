import { pgTable, integer, serial, uuid } from "drizzle-orm/pg-core";

/**
 * Joined table between requisition-approval-workflow and the approval-step tables
 */
export const RequisitionApprovalWorkflowStep = pgTable(
  "requisiton_approval_workflow_steps",
  {
    id: serial("id").primaryKey(),

    stepId: uuid("step_id").notNull(),
    workflowId: uuid("workflow_id").notNull(),
    // The ordering the this step
    stepOrder: integer("step_order").notNull().default(1),
  }
);
