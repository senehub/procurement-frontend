"use server";

import DB from "@/lib/db/conn";
import { Staff } from "@/lib/db/schema";
import {
  StaffDetailInterface,
  StaffInterfaceArray,
} from "@/lib/types/organization/staffs";
import { TypeStaffFormSchema } from "@/lib/db/schema/organization/staffs";
import { eq } from "drizzle-orm";
import { _clerkClient } from "@/lib/server/clerk";

export async function getStaffs(
  limit?: number,
  offset?: number
  // query?: string
) {
  try {
    const [staffs, count] = await Promise.all([
      DB.query.Staff.findMany({
        limit: limit,
        offset: offset,
        columns: {
          createdAt: false,
          unitId: false,
          email: false,
        },
        with: {
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
              manager: {
                columns: {
                  id: true,
                  avatar: true,
                  firstName: true,
                  lastName: true,
                  middleName: true,
                },
              },
            },
          },
        },
      }).execute(),
      DB.$count(Staff),
    ]);

    return { count, staffs: staffs as StaffInterfaceArray };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrive staffs");
  }
}

export async function getStaffDetalil(staffId: string) {
  try {
    const staffs: StaffDetailInterface | undefined =
      await DB.query.Staff.findFirst({
        where: eq(Staff.id, staffId),
        columns: {
          unitId: false,
        },
        with: {
          unit: {
            columns: {
              id: true,
              name: true,
              staffsCount: true,
            },
            with: {
              department: {
                columns: {
                  id: true,
                  name: true,
                  unitsCount: true,
                  staffsCount: true,
                },
                with: {
                  manager: {
                    columns: {
                      id: true,
                      avatar: true,
                      position: true,
                      lastName: true,
                      firstName: true,
                      middleName: true,
                    },
                  },
                },
              },
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
            },
          },
        },
      });

    return staffs;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrive staffs");
  }
}

export async function getStaffUpdateData(staffId: string) {
  try {
    const result = await DB.query.Staff.findFirst({
      where: eq(Staff.id, staffId),
      columns: {
        id: false,
        createdAt: false,
        updatedAt: false,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createStaff(data: TypeStaffFormSchema) {
  try {
    return await DB.transaction(async (tx) => {
      const results = await tx
        .insert(Staff)
        .values(data)
        .returning({ id: Staff.id });

      await _clerkClient.users.createUser({
        emailAddress: [data.email],
        password: "prc@2k2*",
        privateMetadata: {},
        skipPasswordChecks: true,
        lastName: data.lastName,
        firstName: data.firstName,
        publicMetadata: {
          onBoarded: true,
          userType: "staff",
          unitId: data.unitId,
          staffId: results[0].id,
          hasDefaultPassword: true,
        },
      });

      // TODO notify the user about there new account

      return results.at(0);
    });
  } catch (error) {
    throw error;
  }
}

export async function updateStaff(staffId: string, data: TypeStaffFormSchema) {
  try {
    return await DB.transaction(async (tx) => {
      const results = await tx
        .update(Staff)
        .set(data)
        .where(eq(Staff.id, staffId))
        .returning({ id: Staff.id, userId: Staff.userId });

      await Promise.all([
        _clerkClient.users.updateUser(results[0].userId!, {
          lastName: data.lastName,
          firstName: data.firstName,
        }),
        _clerkClient.users.updateUserMetadata(results[0].userId!, {
          publicMetadata: {
            userType: "staff",
            unitId: data.unitId,
            staffId: results[0].id,
            hasDefaultPassword: true,
          },
        }),
      ]);

      // TODO notify the user about there new account

      return results.at(0);
    });
  } catch (error) {
    throw error;
  }
}
