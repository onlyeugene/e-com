"use client";

import { Team } from "@/app/team/page";
import TeamCard from "./teams-card";

interface TeamListProps {
  data: Team[];
  role: boolean;
}

const TeamList = ({ data, role }: TeamListProps) => {
  const safeData = Array.isArray(data) ? data : [];

  const approvedMembers = safeData.filter((member) => member.isApproved);

  const pendingMembers = safeData.filter((member) => !member.isApproved);

  return (
    <div className="space-y-16">
      <div>
        <h2 className="mb-4">Approved Members</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {approvedMembers.map((member) => (
            <TeamCard key={member.email} member={member} isPending={false} role={role} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-4">Pending Members</h2>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {pendingMembers.map((member) => (
            <TeamCard key={member.email} member={member} isPending={true} role={role} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamList;
