// import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   fullName: text("full_name"),
//   phone: varchar("phone", { length: 256 }),
// })

import {
  pgTable,
  pgEnum,
  pgSchema,
  AnyPgColumn,
  serial,
  text,
  real,
} from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"

export const playingWithNeon = pgTable("playing_with_neon", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  value: real("value"),
})
