import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { UserEntity } from '../users.entity';
import { UsersRepository } from '../users.repository';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';

@Injectable()
export class UsersPreloadService {
  private _usersRepository: UsersRepository;
  constructor(private readonly connection: Connection) {
    this._usersRepository =
      this.connection.getCustomRepository(UsersRepository);
  }

  async preloadAgentList(
    req: IRequest,
    query,
  ): Promise<Error | { list: UserEntity[]; count: number }> {
    const { id, role, userTeamLeads } = req.user;

    const {
      take = 15,
      skip = 0,
      teamLeadId,
      searchText,
      selectedId,
      notInIds = [],
    } = query;

    const notIn = [
      selectedId,
      ...(notInIds && !Array.isArray(notInIds) ? [notInIds] : notInIds),
    ]
      .filter(Boolean)
      .map(Number);

    const usersQuery = this._usersRepository
      .createQueryBuilder('users')
      .where(
        '(users.firstName iLIKE :searchText OR users.lastName iLIKE :searchText)',
        {
          searchText: `%${searchText ? searchText : ''}%`,
        },
      );

    if (notIn.length > 0) {
      usersQuery.andWhere('users.id NOT IN (:...notIn)', {
        notIn,
      });
    }

    const isLoadOnlyTeamLeadsAsAgents = [UserRole.CrmManager].includes(role);

    if (teamLeadId) {
      usersQuery.andWhere(
        `users.teamLeadId= :teamLeadId OR (users.id= :teamLeadId AND users.role = '${UserRole.TeamLead}')`,
        {
          teamLeadId,
        },
      );
    } else if (isLoadOnlyTeamLeadsAsAgents && !teamLeadId) {
      if (userTeamLeads.length === 0) {
        return { list: [], count: 0 };
      }
      const queryAssignedTeamLeads = `users.id IN (:...teamLeadIds) AND users.role = '${UserRole.TeamLead}'`;
      const queryAgentsByAssignedTeamLeads = `users.teamLeadId IN (:...teamLeadIds) AND users.role = '${UserRole.Agent}'`;
      usersQuery.andWhere(
        `((${queryAssignedTeamLeads}) OR (${queryAgentsByAssignedTeamLeads}))`,
        {
          teamLeadIds: userTeamLeads.map(({ teamLeadId }) => teamLeadId),
        },
      );
    }

    if (role === UserRole.TeamLead) {
      usersQuery.andWhere('(users.id = :id OR users.teamLeadId = :id)', {
        id,
      });
    } else {
      usersQuery.andWhere('users.role IN (:...roles)', {
        roles: [UserRole.Agent, UserRole.TeamLead],
      });
    }

    const res = await usersQuery
      .orderBy({ 'users.createdAt': 'DESC' })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const [list, count] = res;

    if (selectedId) {
      const selectedDesk = await this._usersRepository.findOne(selectedId);
      if (selectedDesk) {
        list.push(selectedDesk);
      }
    }

    return { list, count };
  }
  async preloadCompanyList(
    req: IRequest,
    query,
  ): Promise<Error | { list: UserEntity[]; count: number }> {
    const {
      take = 15,
      skip = 0,
      searchText,
      selectedId,
      notInIds = [],
    } = query;

    const notIn = [
      selectedId,
      ...(notInIds && !Array.isArray(notInIds) ? [notInIds] : notInIds),
    ]
      .filter(Boolean)
      .map(Number);

    const usersQuery = this._usersRepository
      .createQueryBuilder('users')
      .where(
        '(users."firstName" iLIKE :searchText OR users."lastName" iLIKE :searchText)',
        {
          searchText: `%${searchText ? searchText : ''}%`,
        },
      )
      .andWhere('users.role = :role', {
        role: UserRole.Company,
      });

    if (notIn.length > 0) {
      usersQuery.andWhere('users.id not in (:...notIn)', {
        notIn,
      });
    }

    const res = await usersQuery
      .orderBy({ 'users.createdAt': 'DESC' })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const [list, count] = res;

    if (selectedId) {
      const selectedDesk = await this._usersRepository.findOne(selectedId);
      if (selectedDesk) {
        list.push(selectedDesk);
      }
    }

    return { list, count };
  }

  async preloadTeamLeadList(
    req: IRequest,
    query,
  ): Promise<Error | { list: UserEntity[]; count: number }> {
    const { role, userTeamLeads } = req.user;
    const {
      take = 15,
      skip = 0,
      searchText,
      selectedId,
      notInIds = [],
    } = query;

    const notIn = [
      selectedId,
      ...(notInIds && !Array.isArray(notInIds) ? [notInIds] : notInIds),
    ]
      .filter(Boolean)
      .map(Number);

    const usersQuery = this._usersRepository
      .createQueryBuilder('users')
      .where(
        '(users."firstName" iLIKE :searchText OR users."lastName" iLIKE :searchText)',
        {
          searchText: `%${searchText ? searchText : ''}%`,
        },
      )
      .andWhere('users.role = :role', {
        role: UserRole.TeamLead,
      });

    if (notIn.length > 0) {
      usersQuery.andWhere('users.id not in (:...notIn)', {
        notIn,
      });
    }

    if (role === UserRole.CrmManager) {
      if (userTeamLeads.length === 0) {
        return { list: [], count: 0 };
      }
      usersQuery.andWhere('users.id in (:...ids)', {
        ids: userTeamLeads.map(({ teamLeadId }) => teamLeadId),
      });
    }

    const res = await usersQuery
      .orderBy({ 'users.createdAt': 'DESC' })
      .take(take)
      .skip(skip)
      .getManyAndCount();

    const [list, count] = res;

    if (selectedId) {
      const selectedDesk = await this._usersRepository.findOne(selectedId);
      if (selectedDesk) {
        list.push(selectedDesk);
      }
    }

    return { list, count };
  }
}
