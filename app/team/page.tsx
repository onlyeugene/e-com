import TeamList from "@/components/teams/teams-list";
import { getRoleStatus } from "@/server/actions/get-role-status";
import { auth } from "@/server/auth";
import { prisma } from "@/server/prisma";
import { teamSchema } from "@/types/team-schema";
import { redirect } from "next/navigation";
import { z } from "zod";

// export interface Team  {
//     isAdmin: boolean;
//     name: string;
//     email: string;
//     isApproved: boolean;
//     image: string;
// }

// async function getTeam(): Promise<Team[]> {
//     const res = await fetch(
//       "https://66a6d52223b29e17a1a39127.mockapi.io/team",
//       {
//         cache: "no-store",
//       }
//     );
  
//     const data = await res.json();
//     return data;
// }
export type Team = z.infer<typeof teamSchema>

export default async function TeamPage() {
  //  const data = await getTeam();

  const team = await prisma.user.findMany({
    // where: {
    //   isAdmin: false,
    // },
  })
  const role = await getRoleStatus()

  const session = await auth()
  if(!session) redirect('/sign-in')

   return (
    <div className="p-6">
      <TeamList data={team} role={role!} />
    </div>
   )
}
