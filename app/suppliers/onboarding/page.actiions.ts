"use server";

import DB from "@/lib/db/conn";
import { Supplier } from "@/lib/db/schema/suppliers/supplier";
import { supplierFormSchema, TypeSupplierFormSchema } from "./page.zod";
import { auth } from "@clerk/nextjs/server";
import { ServerActionResponse } from "@/types/global";
import { _clerkClient } from "@/lib/server/clerk";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function verifyOnboard() {
  const { userId, sessionClaims } = await auth();

  try {
    const supplier = (
      await DB.select({ id: Supplier.id })
        .from(Supplier)
        .where(eq(Supplier.userId, userId!))
        .limit(1)
    )[0];

    if (supplier && sessionClaims?.onBoarded) {
      return true;
    } else if (supplier) {
      await _clerkClient.users.updateUserMetadata(userId!, {
        publicMetadata: {
          onBoarded: true,
          userType: "vendor",
          vendorId: supplier.id,
          hasDefaultPassword: false,
        },
      });
      revalidatePath("/", "layout");
      return true;
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
  return false;
}

// Create a server action for creating a supplier
export async function createSupplier(
  data: TypeSupplierFormSchema
): Promise<ServerActionResponse<{ id: string }>> {
  try {
    // Validate the data against the schema
    const validatedData = supplierFormSchema.parse(data);

    const { userId, sessionClaims } = await auth();

    // Insert the supplier data into the database
    const result = await DB.transaction(async (tx) => {
      const supplier = (
        await tx
          .insert(Supplier)
          .values({
            ...validatedData,
            userId: userId!,
            status: "inactive",
            invitedBy: sessionClaims?.inviteMetadata?.invitedBy,
          })
          .returning({ id: Supplier.id })
      )[0];

      await _clerkClient.users.updateUserMetadata(userId!, {
        publicMetadata: {
          onBoarded: true,
          userType: "vendor",
          vendorId: supplier.id,
          hasDefaultPassword: false,
        },
      });

      return supplier;
    });

    revalidatePath("/", "layout");

    return {
      data: result,
    }; // Return the created supplier
  } catch (error) {
    let errMessage = "Operation failed! please try again later";
    if (error instanceof Error) errMessage = error.message;
    return {
      error: true,
      message: errMessage,
    };
  }
}
