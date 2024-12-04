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
import { Staff } from "./staffs";
import { Department } from "./department";
import { z } from "zod";

export const Unit = pgTable("units", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => UUIDv7())
    .notNull(),
  managerId: uuid("manager_id"),
  departmentId: uuid("department_id").notNull(),

  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 50 }).notNull(),
  name: varchar("name", { length: 80 }).notNull(),
  description: text("description")
    .$defaultFn(() => "")
    .notNull(),

  staffsCount: integer("staffs_count").default(0).notNull(),

  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date())
    .notNull(),
});

export const UnitRelations = relations(Unit, ({ one, many }) => {
  return {
    staffs: many(Staff, {
      relationName: "unit_staffs",
    }),
    manager: one(Staff, {
      fields: [Unit.managerId],
      references: [Staff.id],
    }),
    department: one(Department, {
      fields: [Unit.departmentId],
      references: [Department.id],
      relationName: "department_units",
    }),
  };
});

export const UnitFormSchema = z.object({
  departmentId: z.string().uuid(),
  email: z.string().max(50).email(),
  name: z.string().max(50).min(3),
  phone: z.string().max(50).nullish(),
  managerId: z.string().uuid().nullish(),
  description: z.string().max(300).min(3),
});

export type TypeUnitFormSchema = z.infer<typeof UnitFormSchema>;
