import { db } from "~/db/client"
import { accounts } from "~/db/schema"
import { eq } from "drizzle-orm"
import { auth } from "@clerk/nextjs"
import { Button } from "~/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { errors } from "~/lib/utils"

export default async function ManageProfilePage() {
  const { userId } = auth()
  if (!userId) throw new Error(errors.unauthenticated)
  const userAccount = await db.query.accounts.findFirst({
    where: eq(accounts.id, userId),
    with: { profiles: true },
  })
  if (!userAccount) throw new Error(errors.db)
  return (
    <main className="flex flex-col items-center gap-12 ">
      <h1 className="text-5xl">Manage Profiles</h1>
      <ul className="flex gap-4">
        {userAccount.profiles.map((profile) => (
          <Link
            key={profile.id}
            href={`/manage-profile/${profile.name}?profileId=${profile.id}`}
            className="outline-1 hover:outline"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.profileImgPath}
              alt="profile-image"
              width="96"
              height="96"
            />
          </Link>
        ))}
        <Link href="/manage-profile/add">
          <PlusCircle
            className="h-24 w-24 bg-neutral-800 p-3 outline-1 hover:outline"
            strokeWidth={1}
          />
        </Link>
      </ul>
      <Button asChild>
        <Link href="/">Done</Link>
      </Button>
    </main>
  )
}
