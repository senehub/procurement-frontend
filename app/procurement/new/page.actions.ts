"use server";

import DB from "@/lib/db/conn";
import { ServerActionResponse } from "@/types/global";
import { validate } from "uuid";

type Requisition = {
  status: "pending" | "accepted" | "declined";
  title: string | null;
  createdAt: Date;
  staff: {
    id: string;
    position: string;
    lastName: string;
    firstName: string;
    avatar: null | string;
    middleName: null | string;
  };
  unit: {
    id: string;
    name: string;
    department: {
      id: string;
      name: string;
    };
  };
  items: {
    quantity: number;
    unitPrice: number;
  }[];
};

export async function verifyRequisitionId(
  requisitionId: string
): Promise<ServerActionResponse<Requisition>> {
  try {
    console.log(
      "---------------------------1111====2222=====33333=====4444=====5555-----------------------------"
    );

    if (!validate(requisitionId))
      throw new Error("This requisition ID has an invalid format");

    const requisition = await DB.query.Requisition.findFirst({
      where(fields, operators) {
        return operators.and(operators.eq(fields.id, requisitionId));
      },
      columns: {
        title: true,
        status: true,
        createdAt: true,
      },
      with: {
        staff: {
          columns: {
            id: true,
            avatar: true,
            position: true,
            lastName: true,
            firstName: true,
            middleName: true,
          },
        },
        unit: {
          columns: {
            id: true,
            name: true,
          },
          with: {
            department: {
              columns: {
                id: true,
                name: true,
              },
            },
          },
        },
        items: {
          columns: {
            quantity: true,
            unitPrice: true,
          },
        },
      },
    });

    if (!requisition)
      throw new Error("Requisition with this ID does not exist");

    return {
      data: requisition,
    };
  } catch (error: unknown) {
    let message = "This requisition ID is invalid";
    if (error instanceof Error) message = error.message;
    return {
      message,
      error: true,
    };
  }
}
