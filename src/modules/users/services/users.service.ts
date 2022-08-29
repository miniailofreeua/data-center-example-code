import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection, ILike, In } from 'typeorm';

import { hashPassword } from 'src/infrastructure/helpers/password.helper';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { IFindOptions } from '../interfaces/find-options.interface';
import { UserDeskEntity } from '../../userDesks/userDesks.entity';
import { UserDesksRepository } from '../../userDesks/userDesks.repository';
import { UserTeamLeadsRepository } from '../../userTeamLeads/userTeamLeads.repository';
import { UserTeamLeadEntity } from '../../userTeamLeads/userTeamLeads.entity';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UsersRepository } from '../users.repository';
import { IUser, ICreateUser } from '../interfaces';
import { UserEntity } from '../users.entity';
import { UserMapper } from '../users.mapper';
import {
  validateUserDesksPayload,
  cascadeUpdateUserDesks,
  cascadeUpdateUserTeamLeads,
  validateUserTeamLeadsPayload,
  validateUserBrandsPayload,
} from '../helpers';
import { UserBrandEntity } from 'src/modules/userBrands/userBrands.entity';
import { UserBrandsRepository } from 'src/modules/userBrands/userBrands.repository';
import { cascadeUpdateUserBrands } from '../helpers/cascadeUpdateUserBrands';
import chooseTeamLeadId from '../helpers/chooseTeamLeadId';
import { getUsersOptionsFromQuery } from '../helpers/getUsersOptionsFromQuery';

@Injectable()
export class UsersService {
  private _usersRepository: UsersRepository;
  constructor(
    private readonly connection: Connection,
    private readonly _userTeamLeadsRepository: UserTeamLeadsRepository,
    private readonly _userBrandsRepository: UserBrandsRepository,
    private readonly _userDesksRepository: UserDesksRepository,
  ) {
    this._usersRepository =
      this.connection.getCustomRepository(UsersRepository);
  }

  public async createUser(
    registrationPayload: ICreateUser,
    req: IRequest,
  ): Promise<Error | IUser> {
    if (!req.user) {
      return new ForbiddenException(
        'Authentication is wrong. Please try to log in again',
      );
    }
    const {
      id: createdById,
      role,
      companyId: createdByCompany,
      brandId: createdByBrand,
    } = req.user;

    const username = registrationPayload.username.trim().toLocaleLowerCase();

    const userWithSuchUsername = await this._usersRepository.findByUsername(
      username,
    );
    if (userWithSuchUsername) {
      return new Error(`User with username "${username}" is already exist`);
    }

    const passwordHash =
      registrationPayload.role === UserRole.Agent
        ? 'testAgentPassword'
        : await hashPassword(registrationPayload.password);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        firstName,
        lastName,
        role: roleToCreate,
        username,
        userDesks = [],
        userTeamLeads = [],
        userBrands = [],
        brandId,
        teamLeadId,
      } = registrationPayload;
      const {
        identifiers: [{ id: userId }],
      } = await queryRunner.manager.insert(UserEntity, {
        passwordHash,
        username,
        firstName,
        lastName,
        role: roleToCreate,
        createdById,
        teamLeadId: chooseTeamLeadId({
          roleToCreate,
          creatingRole: role,
          createdById,
          teamLeadId,
        }),
        ...(roleToCreate !== UserRole.Company &&
        role !== UserRole.Admin &&
        role !== UserRole.Company
          ? {
              companyId: createdByCompany,
              brandId: createdByBrand,
            }
          : {
              companyId: createdById,
              brandId,
            }),
      });

      validateUserDesksPayload(userDesks, roleToCreate);
      const userDeskEntityToInsert = userDesks
        .filter((ud) => ud.deskId)
        .map(({ deskId }) => ({
          deskId,
          userId,
        }));
      await queryRunner.manager.insert(UserDeskEntity, userDeskEntityToInsert);

      validateUserTeamLeadsPayload(userTeamLeads, roleToCreate);
      const userTeamLeadsEntityToInsert = userTeamLeads
        .filter((ud) => ud.teamLeadId)
        .map(({ teamLeadId }) => ({
          teamLeadId,
          userId,
        }));
      await queryRunner.manager.insert(
        UserTeamLeadEntity,
        userTeamLeadsEntityToInsert,
      );

      validateUserBrandsPayload(userBrands, roleToCreate);
      const userBrandsEntityToInsert = userBrands
        .filter((ud) => ud.brandId)
        .map(({ brandId }) => ({
          brandId,
          userId,
        }));
      await queryRunner.manager.insert(
        UserBrandEntity,
        userBrandsEntityToInsert,
      );

      const createdUser = await queryRunner.manager.findOne(UserEntity, userId);

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return UserMapper.mapOrmEntityToInterface(createdUser);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      return e;
    }
  }

  async updateUser(
    userId: number,
    payload: PartialUpdateUserDto,
    query: any,
  ): Promise<Error | UserEntity> {
    const { isCascadeUpdateAllowed } = query;
    const user = await this._usersRepository.findOne(userId, {
      relations: ['userDesks', 'userTeamLeads', 'userBrands'],
    });

    if (!user) {
      return new NotFoundException('User to update was not found');
    }

    if (isCascadeUpdateAllowed && user.role !== UserRole.Admin) {
      if (Object.prototype.hasOwnProperty.call(payload, 'userDesks')) {
        await cascadeUpdateUserDesks(
          user,
          payload,
          this.connection,
          this._userDesksRepository,
        );
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'userTeamLeads')) {
        await cascadeUpdateUserTeamLeads(
          user,
          payload,
          this.connection,
          this._userTeamLeadsRepository,
        );
      }

      if (Object.prototype.hasOwnProperty.call(payload, 'userBrands')) {
        await cascadeUpdateUserBrands(
          user,
          payload,
          this.connection,
          this._userBrandsRepository,
        );
      }
    }

    if (payload.password) {
      payload.passwordHash = await hashPassword(payload.password);
      delete payload.password;
    }

    delete user.userDesks;
    delete user.userTeamLeads;
    delete user.userBrands;
    delete payload.userDesks;
    delete payload.userTeamLeads;
    delete payload.userBrands;

    const updatedUser = Object.assign(user, payload);
    await this._usersRepository.update(userId, updatedUser);

    return updatedUser;
  }

  findByUsername(username: string): Promise<UserEntity> {
    return this._usersRepository.findByUsername(username);
  }

  findByUsernameWithPassword(username: string): Promise<UserEntity> {
    return this._usersRepository.findByUsernameWithPassword(username);
  }

  async getList(
    req: IRequest,
    query,
  ): Promise<Error | { list: UserEntity[]; count: number }> {
    const { take, skip } = query;
    const { where, relations, orConditions, join } = getUsersOptionsFromQuery(
      query,
      req.user,
    );

    const [list, count] = await this._usersRepository.findAndCount({
      where: orConditions.length ? orConditions : where,
      relations,
      take,
      skip,
      join,
      order: {
        createdAt: 'DESC',
      },
    });

    return { list, count };
  }

  async getUser(userId: number): Promise<Error | UserEntity> {
    const where: IFindOptions = {
      id: userId,
    };

    const user = await this._usersRepository.findOne({
      where,
      relations: [
        'desks',
        'userDesks',
        'userDesks.desk',
        'userTeamLeads',
        'userTeamLeads.teamLead',
        'userBrands',
        'userBrands.brand',
        'company',
        'brand',
      ],
    });

    return user;
  }

  async getCurrentUser(req: any): Promise<Error | UserEntity> {
    if (!req.user) {
      throw new ForbiddenException('Authentication is wrong');
    }
    const { id } = req.user;
    const where: IFindOptions = {
      id,
    };

    const user = await this._usersRepository.findOne({
      where,
      relations: [
        'userDesks',
        'userBrands',
        'userBrands.brand',
        'company',
        'brand',
      ],
    });

    return user;
  }
}
