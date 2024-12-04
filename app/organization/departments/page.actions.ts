"use server";

import DB from "@/lib/db/conn";
import { Department } from "@/lib/db/schema";
import { DepartmentArray } from "@/lib/types/organization/department";
import { TypeDepartmentFormSchema } from "@/lib/db/schema/organization/department";
import { eq } from "drizzle-orm";

export async function getDepartments(
  limit?: number,
  offset?: number
  // query?: string
) {
  try {
    const [departments, count] = await Promise.all([
      DB.query.Department.findMany({
        limit: limit,
        offset: offset,
        columns: {
          managerId: false,
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
        },
      }).execute(),
      DB.$count(Department),
    ]);

    return { count, departments: departments as DepartmentArray };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrive departments");
  }
}

export async function getDepartmentDetail(departmentId: string) {
  try {
    const department = await DB.query.Department.findFirst({
      where: eq(Department.id, departmentId),
      columns: {
        managerId: false,
      },
      with: {
        manager: {
          columns: {
            id: true,
            firstName: true,
            lastName: true,
            middleName: true,
            avatar: true,
          },
        },
        units: {
          with: {
            staffs: {
              columns: {
                id: true,
                avatar: true,
                position: true,
                firstName: true,
                lastName: true,
                middleName: true,
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

    return department;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrive departments");
  }
}

export async function getDepartmentUpdateData(departmentId: string) {
  try {
    const result = await DB.query.Department.findFirst({
      where: eq(Department.id, departmentId),
      columns: {
        createdAt: false,
        staffsCount: false,
        unitsCount: false,
        updatedAt: false,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function createDepartment(data: TypeDepartmentFormSchema) {
  try {
    const results = await DB.insert(Department)
      .values(data)
      .returning({ id: Department.id });
    return results.at(0);
  } catch (error) {
    throw error;
  }
}

export async function updateDepartment(
  departmentId: string,
  data: TypeDepartmentFormSchema
) {
  try {
    const results = await DB.update(Department)
      .set(data)
      .where(eq(Department.id, departmentId))
      .returning({ id: Department.id });
    return results.at(0);
  } catch (error) {
    throw error;
  }
}
