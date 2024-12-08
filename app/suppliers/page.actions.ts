"use server";

import DB from "@/lib/db/conn";
import { Supplier } from "@/lib/db/schema";

export async function getSuppliers(
  limit?: number,
  offset?: number
  // query?: string
) {
  try {
    const [suppliers, count] = await Promise.all([
      DB.query.Supplier.findMany({
        limit: limit,
        offset: offset,
        columns: {
          invitedBy: false,
          contactPhone: false,
          paymentTerms: false,
          taxId: false,
          address: false,
          userId: false,
          website: false,
          description: false,
          updatedAt: false,
        },
      }).execute(),
      DB.$count(Supplier),
    ]);
    return {
      count,
      suppliers,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve suppliers");
  }
}

export type SupplierInterface = Awaited<
  ReturnType<typeof getSuppliers>
>["suppliers"][number];
