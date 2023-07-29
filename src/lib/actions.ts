"use server"

import { db } from "~/db/client"
import { myShows } from "~/db/schema"
import { auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { accounts, profiles } from "~/db/schema"
import { z } from "zod"
import { zact } from "zact/server"

export const addProfile = zact(z.object({ name: z.string().min(3) }))(async (
  input,
) => {
  const userId = auth().userId
  if (!userId) throw new Error("Unauthorized")
  const userAccount = await db.query.accounts.findFirst({
    where: eq(accounts.id, userId),
    with: {
      profiles: true,
    },
  })
  if (!userAccount) throw new Error("Could not find user account")
  if (userAccount.profiles.length === 4)
    throw new Error("Already at max number of profiles")
  await db.insert(profiles).values({
    id: `${userAccount.id}/${userAccount.profiles.length + 1}`,
    accountId: userAccount.id,
    name: input.name,
    profileImgPath: `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${input.name}`,
  })
  return { message: `Profile ${input.name} created` }
})

export const toggleMyShow = zact(z.object({ id: z.number() }))(async (
  input,
) => {
  const userId = auth().userId
  if (!userId) throw new Error("Unauthorized")
  const userAccount = await db.query.accounts.findFirst({
    where: eq(accounts.id, userId),
  })
  if (!userAccount) throw new Error("Could not find user account")
  const res = await db
    .insert(myShows)
    .values({
      id: input.id,
      profileId: userAccount.activeProfileId,
    })
    .onConflictDoNothing()

  if (!res.rowCount) await db.delete(myShows).where(eq(myShows.id, input.id))
})

// export async function toggleMyShow(showId: number) {
//   const userId = auth().userId
//   if (!userId) throw new Error("Unauthorized")
//   const userAccount = await db.query.accounts.findFirst({
//     where: eq(accounts.id, userId),
//   })
//   if (!userAccount) throw new Error("Could not find user account")
//   const res = await db
//     .insert(myShows)
//     .values({
//       id: showId,
//       profileId: userAccount.activeProfileId,
//     })
//     .onConflictDoNothing()

//   if (!res.rowCount) await db.delete(myShows).where(eq(myShows.id, showId))
// }
