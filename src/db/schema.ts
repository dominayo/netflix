import { relations } from "drizzle-orm"
import {
  pgTable,
  serial,
  text,
  real,
  varchar,
  integer,
  timestamp,
  pgEnum,
  json,
  primaryKey,
} from "drizzle-orm/pg-core"

export const memebershipEnum = pgEnum("membership", [
  "basic",
  "standard",
  "premium",
])
export const accounts = pgTable("accounts", {
  id: varchar("id", { length: 256 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  membership: memebershipEnum("membership"),
  activeProfileId: varchar("active_profile_id", { length: 256 }).notNull(),
})
export const accountsRelations = relations(accounts, ({ many, one }) => ({
  profiles: many(profiles),
  activeProfile: one(profiles, {
    fields: [accounts.activeProfileId],
    references: [profiles.id],
  }),
}))

export const profiles = pgTable("profiles", {
  id: varchar("id", { length: 256 }).primaryKey(),
  accountId: varchar("account_id", { length: 256 })
    .references(() => accounts.id)
    .notNull(),
  profileImgPath: varchar("profile_img_path", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
})
export const profilesRelation = relations(profiles, ({ one, many }) => ({
  ownerAccount: one(accounts, {
    fields: [profiles.accountId],
    references: [accounts.id],
  }),
  savedShows: many(myShows),
}))

export const mediaTypeEnum = pgEnum("media_type", ["movie", "tv"])
export const myShows = pgTable(
  "my_shows",
  {
    id: integer("id").notNull(),
    mediaType: mediaTypeEnum("media_type").notNull(),
    profileId: varchar("profile_id", { length: 256 })
      .references(() => profiles.id)
      .notNull(),
  },
  (t) => ({ pk: primaryKey(t.id, t.profileId) }),
)
export const myShowsRelation = relations(myShows, ({ one }) => ({
  profile: one(profiles, {
    fields: [myShows.profileId],
    references: [profiles.id],
  }),
}))
