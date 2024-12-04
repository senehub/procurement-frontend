import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 as UUIDv7 } from "uuid";
import { z } from "zod";
import { Staff } from "./staffs";
import { Unit } from "./units";

export const Department = pgTable("departments", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => UUIDv7())
    .notNull(),
  managerId: uuid("manager_id"),

  email: varchar("email", { length: 50 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  name: varchar("name", { length: 80 }).notNull(),
  description: text("description")
    .$defaultFn(() => "")
    .notNull(),

  unitsCount: integer("units_count").default(0).notNull(),
  staffsCount: integer("staffs_count").default(0).notNull(),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});

export const DepartmentRelations = relations(Department, ({ one, many }) => {
  return {
    units: many(Unit, {
      relationName: "department_units",
    }),
    manager: one(Staff, {
      fields: [Department.managerId],
      references: [Staff.id],
    }),
  };
});

export const DepartmentFormSchema = z.object({
  name: z.string().max(50).min(3),
  email: z.string().max(50).email(),
  phone: z.string().max(50).nullish(),
  managerId: z.string().uuid().nullish(),
  description: z.string().max(300),
});

export type TypeDepartmentFormSchema = z.infer<typeof DepartmentFormSchema>;
