"use server";

import DB from "@/lib/db/conn";
import {
  TypeApprovalStepFormSchema,
  TypeMatrixFormSchema,
  TypeWorkflowFormSchema,
} from "./page.validators";
import {
  RequisitionApprovalMatrix,
  RequisitionApprovalStep,
  RequisitionApprovalWorkflow,
  RequisitionApprovalWorkflowStep,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// ======================================== Matrixes ====================================== //

export async function getApprovalMatrixes(
  limit?: number,
  offset?: number,
  query?: string
) {
  const matrixes = await DB.query.RequisitionApprovalMatrix.findMany({
    limit: limit,
    offset: offset,
    where(fields, operators) {
      if (!query?.trim()) return undefined;
      return operators.or(
        operators.ilike(fields.name, `%${query.trim()}%`),
        operators.ilike(fields.description, `%${query.trim()}%`)
      );
    },
    orderBy(fields, operators) {
      return operators.desc(fields.createdAt);
    },
    columns: {
      unitId: false,
      workflowId: false,
      departmentId: false,
    },
    with: {
      unit: {
        columns: {
          id: true,
          name: true,
        },
      },
      department: {
        columns: {
          id: true,
          name: true,
        },
      },
      workflow: {
        columns: {
          id: true,
          name: true,
          description: true,
          stepsCount: true,
          workflowType: true,
        },
      },
    },
  });

  return matrixes;
}
export type MatrixInterface = Awaited<
  ReturnType<typeof getApprovalMatrixes>
>[number];

export async function getApprovalMatrixFormData(matrixId: string) {
  const matrix = await DB.query.RequisitionApprovalMatrix.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, matrixId);
    },
    columns: {
      id: false,
      createdAt: false,
      updatedAt: false,
    },
  });
  return matrix;
}

export async function createApprovalMatrix(data: TypeMatrixFormSchema) {
  try {
    const results = await DB.insert(RequisitionApprovalMatrix)
      .values(data)
      .returning({
        id: RequisitionApprovalMatrix.id,
      });
    return results[0];
  } catch (error: unknown) {
    throw error;
  }
}

// ======================================== Workflows ====================================== //

export async function getApprovalWorkflows(
  limit?: number,
  offset?: number,
  query?: string
) {
  const workflows = await DB.query.RequisitionApprovalWorkflow.findMany({
    limit: limit,
    offset: offset,
    orderBy(fields, operators) {
      return operators.desc(fields.createdAt);
    },
    where(fields, operators) {
      if (!query?.trim()) return undefined;
      return operators.or(
        operators.ilike(fields.name, `%${query.trim()}%`),
        operators.ilike(fields.description, `%${query.trim()}%`)
      );
    },
    // where: query ? (and(eq())) : undefined,
    with: {
      steps: {
        columns: {
          stepId: false,
          workflowId: false,
        },
        with: {
          step: {
            columns: {
              staffId: false,
            },
            with: {
              staff: {
                columns: {
                  id: true,
                  avatar: true,
                  firstName: true,
                  middleName: true,
                  lastName: true,
                  position: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return workflows;
}
export type WorkflowInterface = Awaited<
  ReturnType<typeof getApprovalWorkflows>
>[number];

export async function getApprovalWorkflowFormData(matrixId: string) {
  const workflow = await DB.query.RequisitionApprovalWorkflow.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, matrixId);
    },
    columns: {
      id: false,
      createdAt: false,
      updatedAt: false,
    },
    with: {
      steps: {
        columns: {
          id: false,
        },
      },
    },
  });
  return workflow;
}

export async function createApprovalWorkflow(data: TypeWorkflowFormSchema) {
  try {
    const result = await DB.transaction(async (tx) => {
      const { steps, ...workflowData } = data;

      const results = await tx
        .insert(RequisitionApprovalWorkflow)
        .values(workflowData)
        .returning({
          id: RequisitionApprovalWorkflow.id,
        });

      const workflowSteps = steps.map((step) => {
        return {
          ...step,
          workflowId: results[0].id,
        };
      });

      await Promise.all([
        tx
          .insert(RequisitionApprovalWorkflowStep)
          .values(workflowSteps)
          .execute(),
        tx
          .update(RequisitionApprovalWorkflow)
          .set({ stepsCount: workflowSteps.length })
          .where(eq(RequisitionApprovalWorkflow.id, results[0].id)),
      ]);
      return results[0];
    });
    return result;
  } catch (error: unknown) {
    throw error;
  }
}

// ======================================== Approval Steps ====================================== //
export async function getApprovalSteps(
  limit?: number,
  offset?: number,
  query?: string
) {
  const workflows = await DB.query.RequisitionApprovalStep.findMany({
    limit: limit,
    offset: offset,
    orderBy(fields, operators) {
      return operators.desc(fields.createdAt);
    },
    where(fields, operators) {
      if (!query?.trim()) return undefined;
      return operators.or(
        operators.ilike(fields.name, `%${query.trim()}%`),
        operators.ilike(fields.description, `%${query.trim()}%`)
      );
    },
    columns: {
      staffId: false,
    },
    with: {
      staff: {
        columns: {
          id: true,
          avatar: true,
          firstName: true,
          middleName: true,
          lastName: true,
          position: true,
        },
      },
    },
  });

  return workflows;
}
export type ApprovalStepInterface = Awaited<
  ReturnType<typeof getApprovalSteps>
>[number];

export async function getApprovalStepFormData(matrixId: string) {
  const matrix = await DB.query.RequisitionApprovalStep.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, matrixId);
    },
    columns: {
      id: false,
      createdAt: false,
      updatedAt: false,
    },
  });
  return matrix;
}

export async function createApprovalStep(data: TypeApprovalStepFormSchema) {
  try {
    const results = await DB.insert(RequisitionApprovalStep)
      .values(data)
      .returning({
        id: RequisitionApprovalStep.id,
      });
    return results[0];
  } catch (error: unknown) {
    throw error;
  }
}
