import DB from "@/lib/db/conn";
import { Requisition } from "./pr";
import { RequisitionApprovalMatrix } from "./pr_approval.matrix";
import { desc } from "drizzle-orm";

type InterfaceMatrixArray = (typeof RequisitionApprovalMatrix.$inferInsert)[];

type Requisition = {
  priority: string;
  items: { unitPrice: number; quantity: number }[];
};

type RequisitionUnit = {
  id: string;
  departmentId: string;
};

export async function getMatchingApprovalMatrix(
  requisition: Requisition,
  unit: RequisitionUnit
) {
  if (!requisition) return null;

  const totalPrice = requisition.items.reduce(
    (acc, cur) => (acc += cur.unitPrice * cur.quantity),
    0
  );

  const matchingMatrixes = [] as InterfaceMatrixArray;

  // Get all matrixes from the db
  const matrixes = await DB.select()
    .from(RequisitionApprovalMatrix)
    .orderBy(desc(RequisitionApprovalMatrix.createdAt));

  for (const matrix of matrixes) {
    // Check if the total price is within the matrix's amount range
    if (matrix.minAmount > totalPrice) continue;
    if (matrix.maxAmount < totalPrice) continue;

    // Check if the matrix's unit ID matches the requisition's unit ID
    if (matrix.unitId) {
      if (matrix.unitId != unit.id) continue;
    }

    // Check if the matrix's department ID matches the requisition's unit department ID
    if (matrix.departmentId) {
      if (matrix.departmentId != unit.departmentId) continue;
    }
    // If all checks pass, add the matrix to the matching matrixes array
    matchingMatrixes.push(matrix);
  }

  // Determine the appropriate matrix for this requisition
  let matrix: InterfaceMatrixArray[number] | null = null;

  //   if (matchingMatrixes.length > 0) {
  //     // Example criteria: Select the matrix with the highest priority or any other specific condition
  //     matrix = matchingMatrixes.reduce((prev, current) => {
  //       // Replace this condition with your actual logic for selecting the appropriate matrix
  //       return prev.priority > current.priority ? prev : current;
  //     });
  //   }

  matrix = matchingMatrixes[0];

  return matrix || null;
}
