import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";
import { Unit } from "./units";
import { z } from "zod";

export const Staff = pgTable("staffs", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => UUIDv7())
    .notNull(),
  unitId: uuid("unitId").notNull(),

  avatar: text("avatar"),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 50 }).notNull(),

  middleName: varchar("middle_name", { length: 50 }),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  firstName: varchar("first_name", { length: 50 }).notNull(),

  position: varchar("position", { length: 80 }).notNull(),
  gender: varchar("gender", { length: 10, enum: ["male", "female", "other"] }),

  isActive: boolean("is_active").notNull().default(true),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});

export const StaffRelations = relations(Staff, ({ one }) => {
  return {
    unit: one(Unit, {
      fields: [Staff.unitId],
      references: [Unit.id],
      relationName: "unit_staffs",
    }),
  };
});

export const StaffFormSchema = z.object({
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

export type TypeStaffFormSchema = z.infer<typeof StaffFormSchema>;
