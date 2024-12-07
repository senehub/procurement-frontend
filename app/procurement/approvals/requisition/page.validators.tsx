import { z } from "zod";

// ====================================== Approval Steps =================================== //

export const approvalStepFormSchema = z.object({
  name: z
    .string()
    .min(1, "Step name is required")
    .max(50, "Step name must be 50 characters or less"),
  description: z.string().optional(),
  staffId: z.string().uuid("Approver is required"),
});

export type TypeApprovalStepFormSchema = z.infer<typeof approvalStepFormSchema>;

// ====================================== Workflows =================================== //
export const worlflowStepFormSchema = z.object({
  stepId: z.string().min(1, "Approver role is required"),
  stepOrder: z.number().min(1, "Order must be at least 1"),
});

export const workflowFormSchema = z.object({
  name: z.string().min(1, "Workflow name is required"),
  description: z.string().optional(),
  workflowType: z.enum(["sequential", "parallel"]),
  steps: z
    .array(worlflowStepFormSchema)
    .min(1, "At least one approval step is required"),
});

export type TypeWorkflowFormSchema = z.infer<typeof workflowFormSchema>;
export type TypeWorkflowStepFormSchema = z.infer<typeof worlflowStepFormSchema>;

// ====================================== Matrixes =================================== //

export const matrixFormSchema = z.object({
  name: z.string().min(1, "Matrix name is required"),
  description: z.string().optional(),
  unitId: z.string().uuid().nullish(),
  departmentId: z.string().uuid().nullish(),
  workflowId: z.string().uuid("Workflow is required"),
  minAmount: z.number().min(0, "Minimum amount must be non-negative"),
  maxAmount: z.number().min(0, "Maximum amount must be non-negative"),
});

export type TypeMatrixFormSchema = z.infer<typeof matrixFormSchema>;
