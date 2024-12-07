import { relations } from "drizzle-orm";
import { pgTable, integer, serial, uuid } from "drizzle-orm/pg-core";
import { RequisitionApprovalWorkflow } from "./pr_approval.workflow";
import { RequisitionApprovalStep } from "./pr_approval.step";

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

export const RequisitionApprovalWorkflowStepRelations = relations(
  RequisitionApprovalWorkflowStep,
  ({ one }) => {
    return {
      step: one(RequisitionApprovalStep, {
        relationName: "approval_steps",
        references: [RequisitionApprovalStep.id],
        fields: [RequisitionApprovalWorkflowStep.stepId],
      }),
      workflow: one(RequisitionApprovalWorkflow, {
        relationName: "workflow_steps",
        references: [RequisitionApprovalWorkflow.id],
        fields: [RequisitionApprovalWorkflowStep.workflowId],
      }),
    };
  }
);
