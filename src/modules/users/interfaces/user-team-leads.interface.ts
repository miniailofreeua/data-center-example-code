export interface IUserTeamLeads {
  id: number;
  teamLeadId: number;
  userId: number;
}

export type ICreateUserTeamLeadsPayload = { teamLeadId: number };

export type IUpdateUserTeamLeadsPayload = IUserTeamLeads;
