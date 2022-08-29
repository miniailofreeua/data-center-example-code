import { UserRole } from 'src/infrastructure/enums/UserRole.enum';

export default function chooseTeamLeadId({
  roleToCreate,
  creatingRole,
  createdById,
  teamLeadId,
}: {
  roleToCreate: string;
  creatingRole: string;
  createdById: number;
  teamLeadId: number;
}): number | null {
  if (roleToCreate === UserRole.Agent) {
    if (creatingRole === UserRole.TeamLead) {
      return createdById;
    }

    if (creatingRole !== UserRole.TeamLead) {
      return teamLeadId;
    }
  } else {
    return null;
  }
}
