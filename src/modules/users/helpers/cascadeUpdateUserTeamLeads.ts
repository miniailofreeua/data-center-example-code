import { Connection } from 'typeorm';
import { UserEntity } from '../users.entity';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UserTeamLeadEntity } from 'src/modules/userTeamLeads/userTeamLeads.entity';
import { validateUserTeamLeadsPayload } from './validateUserTeamLeadsPayload';
import { BadRequestException } from '@nestjs/common';

export const cascadeUpdateUserTeamLeads = async (
  user: UserEntity,
  payload: PartialUpdateUserDto,
  connection: Connection,
  _userTeamLeadsRepository,
) => {
  const { id: userId, userTeamLeads } = user;
  if (!payload.userTeamLeads || !Array.isArray(payload.userTeamLeads)) {
    throw new BadRequestException('Provide assigned Team Leads list');
  }
  validateUserTeamLeadsPayload(payload.userTeamLeads, payload.role);

  const userTeamLeadIdsToRemoveFromDb = [];
  const userTeamLeadsToCreate = [];
  payload.userTeamLeads.forEach((userTeamLead) => {
    const { teamLeadId } = userTeamLead;
    const isExist = userTeamLeads.find((ud) => teamLeadId === ud.teamLeadId);
    if (!isExist && teamLeadId) {
      userTeamLeadsToCreate.push({
        teamLeadId,
        userId,
      });
    }
  });
  userTeamLeads.forEach((userTeamLead) => {
    const isToDeleted = !payload.userTeamLeads.some(
      (ud) => userTeamLead.teamLeadId === ud.teamLeadId,
    );
    if (isToDeleted) {
      userTeamLeadIdsToRemoveFromDb.push(userTeamLead);
    }
  });
  if (userTeamLeadIdsToRemoveFromDb.length > 0) {
    const res = await _userTeamLeadsRepository.delete(
      userTeamLeadIdsToRemoveFromDb,
    );
  }

  const queryRunner = connection.createQueryRunner();
  await queryRunner.manager.insert(UserTeamLeadEntity, userTeamLeadsToCreate);
};
