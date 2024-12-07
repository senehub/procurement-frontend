import { generateEntityCode } from "@/lib/utils";

import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";

export const Supplier = pgTable("suppliers", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => UUIDv7())
    .notNull(),
  userId: varchar("user_id", { length: 100 }).notNull(),
  publicId: varchar("public_id", { length: 100 })
    .$defaultFn(() => generateEntityCode("Vendor"))
    .notNull(),

  contactPhone: varchar("phone", { length: 50 }),
  contactEmail: varchar("email", { length: 50 }).notNull(),

  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 1000 }),
  address: text("address").notNull(),

  invitedBy: uuid("invited_by"),

  status: text("status", {
    enum: ["active", "inactive", "suspended"],
  }).notNull(),

  notes: text("notes"),
  website: varchar("website", { length: 255 }),

  taxId: varchar("tax_id", { length: 50 }),
  paymentTerms: varchar("payment_terms", { length: 50 }),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),

  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});
