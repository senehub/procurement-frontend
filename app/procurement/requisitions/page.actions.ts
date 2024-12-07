"use server";

import DB from "@/lib/db/conn";
import {
  Requisition,
  RequisitionApprovalRecord,
  RequisitionItem,
} from "@/lib/db/schema";
import { RequisitionInterfaceArray } from "@/lib/types/procurement/requisition";
import { TypeRequisitionFormSchema } from "@/lib/db/schema/procurement/requisition/pr";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { getMatchingApprovalMatrix } from "@/lib/db/schema/procurement/requisition/utils";
import { notFound } from "next/navigation";
import { ServerActionResponse } from "@/types/global";
import { revalidatePath } from "next/cache";

export async function getRequisitions(
  limit?: number,
  offset?: number
  // query?: string
) {
  try {
    const [requisitions, count] = await Promise.all([
      DB.query.Requisition.findMany({
        limit: limit,
        offset: offset,
        orderBy(fields, operators) {
          return operators.desc(fields.createdAt);
        },
        columns: {
          staffId: false,
          staffUnitId: false,
        },
        with: {
          staff: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              middleName: true,
              avatar: true,
            },
          },
          unit: {
            columns: {
              id: true,
              name: true,
            },
          },
          items: {
            columns: {
              id: true,
              name: true,
              unitPrice: true,
              quantity: true,
            },
          },
        },
      }).execute(),
      DB.$count(Requisition),
    ]);

    return { count, requisitions: requisitions as RequisitionInterfaceArray };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve requisitions");
  }
}

export async function getRequisitionDetail(requisitionId: string) {
  try {
    const requisition = await DB.query.Requisition.findFirst({
      where: eq(Requisition.id, requisitionId),
      columns: {
        staffId: false,
        staffUnitId: false,
      },
      with: {
        staff: {
          columns: {
            id: true,
            lastName: true,
            middleName: true,
            firstName: true,
            position: true,
            avatar: true,
          },
        },
        items: {
          columns: {
            staffId: false,
            requisitionId: false,
          },
        },
        unit: {
          columns: {
            id: true,
            name: true,
          },
          with: {
            manager: {
              columns: {
                id: true,
                avatar: true,
                position: true,
                firstName: true,
                lastName: true,
                middleName: true,
              },
            },
            department: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        approvalRecords: {
          columns: {
            staffId: false,
            requisitionId: false,
            updatedAt: false,
          },
          with: {
            staff: {
              columns: {
                id: true,
                avatar: true,
                position: true,
                firstName: true,
                lastName: true,
                middleName: true,
              },
            },
          },
        },
        approvalWorkflow: {
          columns: {
            createdAt: false,
            updatedAt: false,
            stepsCount: false,
          },
          with: {
            steps: {
              columns: {
                id: true,
                stepOrder: true,
              },
              with: {
                step: {
                  columns: {
                    createdAt: false,
                    staffId: false,
                    updatedAt: false,
                  },
                  with: {
                    staff: {
                      columns: {
                        id: true,
                        avatar: true,
                        position: true,
                        firstName: true,
                        lastName: true,
                        middleName: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!requisition) return notFound();

    return requisition;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrive requisitions");
  }
}

export async function getRequisitionUpdateData(requisitionId: string) {
  try {
    const result = await DB.query.Requisition.findFirst({
      where: eq(Requisition.id, requisitionId),
      columns: {
        createdAt: false,
        staffId: false,
        staffUnitId: false,
        approvalWorkflowId: false,
      },
      with: {
        items: {
          columns: {
            createdAt: false,
            updatedAt: false,
            staffId: false,
            requisitionId: false,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
export async function createRequisition({
  items,
  ...data
}: TypeRequisitionFormSchema) {
  try {
    const { sessionClaims } = await auth();

    // Making sure the user is legit
    if (
      !sessionClaims ||
      !sessionClaims.unitId ||
      !sessionClaims.staffId ||
      sessionClaims.userType != "staff"
    )
      throw new Error("Forbidden! This request is forbidden");

    const staff = await DB.query.Staff.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, sessionClaims.staffId!);
      },
      columns: {
        id: true,
        unitId: true,
      },
      with: {
        unit: {
          columns: {
            id: true,
            departmentId: true,
          },
        },
      },
    });

    if (!staff) throw new Error("This request is forbidden");

    const approvalMatrix = await getMatchingApprovalMatrix(
      { items, priority: data.priority },
      staff.unit
    );

    if (!approvalMatrix)
      throw new Error("Your requisition has no matching approval workflow");

    const results = await DB.transaction(async (tx) => {
      // Create the requisition
      const results = await tx
        .insert(Requisition)
        .values({
          ...data,
          staffId: sessionClaims.staffId!,
          staffUnitId: sessionClaims.unitId!,
          approvalWorkflowId: approvalMatrix.workflowId,
        })
        .returning({ id: Requisition.id });

      // Populate the pr-items with the required fields
      const pr_items = items.map((item) => ({
        ...item,
        requisitionId: results[0].id,
        staffId: sessionClaims.staffId!,
      }));

      // Create the pr-items with the populated data
      await Promise.all([
        tx.insert(RequisitionItem).values(pr_items).execute(),
        tx.update(Requisition),
      ]);

      return results;
    });

    return results.at(0);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error(error.message);
    }
    throw error;
  }
}
export async function updateRequisition(
  requisitionId: string,
  data: TypeRequisitionFormSchema
) {
  try {
    const results = await DB.update(Requisition)
      .set(data)
      .where(eq(Requisition.id, requisitionId))
      .returning({ id: Requisition.id });
    return results.at(0);
  } catch (error) {
    throw error;
  }
}

export async function approveRequisition(
  pathname: string,
  data: {
    staffId?: string;
    comment?: string;
    requisitionId: string;
    approvalStepId: string;
    approval: "pending" | "accepted" | "declined";
  }
): Promise<ServerActionResponse<{ id: string }>> {
  try {
    const { sessionClaims } = await auth();

    if (!sessionClaims?.staffId) throw new Error("This request is forbidden");

    const requisition = await DB.query.Requisition.findFirst({
      where(fields, operators) {
        return operators.eq(fields.id, data.requisitionId);
      },
      columns: {
        id: true,
        status: true,
      },
      with: {
        approvalRecords: {
          columns: {
            id: true,
            approvalStepId: true,
          },
        },
        approvalWorkflow: {
          columns: {},
          with: {
            steps: {
              columns: {
                stepOrder: true,
              },
              orderBy(fields, operators) {
                return operators.desc(fields.stepOrder);
              },
              with: {
                step: {
                  columns: {
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!requisition) throw new Error("This request is forbidden");

    if (requisition.status !== "pending")
      throw new Error("Requisition already approved");

    let workflowExecuted = false;
    for (const workflowStep of requisition.approvalWorkflow.steps) {
      if (workflowStep.step.id === data.approvalStepId) {
        workflowExecuted = true;
        continue;
      }

      const stepExecuted = requisition.approvalRecords.find(
        ({ approvalStepId }) => approvalStepId === workflowStep.step.id
      );

      if (!stepExecuted) {
        workflowExecuted = false;
        break;
      }
      workflowExecuted = true;
    }

    const result = await DB.transaction(async (tx) => {
      let requisitionStatus: "pending" | "accepted" | "declined" =
        data.approval === "declined" ? "declined" : "pending";

      if (requisitionStatus === "pending" && workflowExecuted) {
        requisitionStatus = "accepted";
      }

      const result = (
        await tx
          .insert(RequisitionApprovalRecord)
          .values({
            comment: data.comment,
            approval: data.approval,
            staffId: sessionClaims.staffId!,
            requisitionId: data.requisitionId,
            approvalStepId: data.approvalStepId,
          })
          .returning({ id: RequisitionApprovalRecord.id })
      )[0];

      await tx
        .update(Requisition)
        .set({ status: requisitionStatus })
        .where(eq(Requisition.id, requisition.id));

      return result;
    });

    revalidatePath(pathname, "page");

    return {
      data: result,
    };
  } catch (error) {
    if (error instanceof Error)
      return {
        error: true,
        message: error.message,
      };
    return {
      error: true,
      message: "Error! while approving requisition",
    };
  }
}

export type RequisitionInterface = Awaited<
  ReturnType<typeof getRequisitions>
>["requisitions"][number];

export type RequisitionDetailInterface = Awaited<
  ReturnType<typeof getRequisitionDetail>
>;
