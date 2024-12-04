"use server";

import DB from "@/lib/db/conn";
import { Unit } from "@/lib/db/schema";
import {
  UnitDetailInterface,
  UnitInterfaceArray,
} from "@/lib/types/organization/unit";
import { TypeUnitFormSchema } from "@/lib/db/schema/organization/units";
import { eq } from "drizzle-orm";

export async function getUnits(
  limit?: number,
  offset?: number
  // query?: string
) {
  try {
    const [units, count] = await Promise.all([
      DB.query.Unit.findMany({
        limit: limit,
        offset: offset,
        columns: {
          managerId: false,
          departmentId: false,
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
          department: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      }).execute(),
      DB.$count(Unit),
    ]);

    return { count, units: units as UnitInterfaceArray };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrive units");
  }
}

export async function getUnitDetail(unitId: string) {
  try {
    const unit: undefined | UnitDetailInterface = await DB.query.Unit.findFirst(
      {
        where: eq(Unit.id, unitId),
        columns: {
          managerId: false,
          departmentId: false,
        },
        with: {
          staffs: {
            columns: {
              id: true,
              lastName: true,
              middleName: true,
              firstName: true,
              position: true,
              avatar: true,
            },
          },
          manager: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
              middleName: true,
              avatar: true,
            },
          },
          department: {
            columns: {
              id: true,
              name: true,
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
            },
          },
        },
      }
    );

    return unit;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrive units");
  }
}

export async function getUnitUpdateData(unitId: string) {
  try {
    const result = await DB.query.Unit.findFirst({
      where: eq(Unit.id, unitId),
      columns: {
        createdAt: false,
        staffsCount: false,
        updatedAt: false,
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
}
export async function createUnit(data: TypeUnitFormSchema) {
  try {
    const results = await DB.insert(Unit)
      .values(data)
      .returning({ id: Unit.id });
    return results.at(0);
  } catch (error) {
    throw error;
  }
}
export async function updateUnit(unitId: string, data: TypeUnitFormSchema) {
  try {
    const results = await DB.update(Unit)
      .set(data)
      .where(eq(Unit.id, unitId))
      .returning({ id: Unit.id });
    return results.at(0);
  } catch (error) {
    throw error;
  }
}
