import { relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";
import { z } from "zod";
import { Staff } from "../organization";

export const User = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => UUIDv7())
    .notNull(),

  staffId: uuid("staff_id"),
  vendorId: uuid("vendor_id"),

  password: boolean("password").default(true),
  verified: boolean("verified").notNull().default(true),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});

export const UserRelations = relations(User, ({ one }) => {
  return {
    staff: one(Staff, {
      fields: [User.staffId],
      references: [Staff.userId],
    }),
  };
});

export const UserFormSchema = z.object({
  unitId: z.string().uuid(),
  avatar: z.string().nullish(),
  email: z.string().max(50).email(),
  phone: z.string().max(50).nullish(),
  middleName: z.string().max(50).nullish(),
  lastName: z.string().max(50).min(3),
  firstName: z.string().max(50).min(3),
  position: z.string().max(80).min(3),
  gender: z.enum(["male", "female", "other"]).nullish(),
});

export type TypeUserFormSchema = z.infer<typeof UserFormSchema>;
