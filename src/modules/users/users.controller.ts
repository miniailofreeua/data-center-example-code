import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Query,
  ParseIntPipe,
  Param,
  Put,
} from '@nestjs/common';
import { SchemaValidationPipe } from '../../infrastructure/pipes/schema_validation.pipe';

import { UsersService } from './services/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { IUser } from './interfaces';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { FindAllAndCountDto } from 'src/infrastructure/dtos/find-all-and-count.query.dto';
import { UserEntity } from './users.entity';
import { PartialUpdateUserDto } from './dtos/partial-update-user.dto';
import { UpdatePartialUserQueryDto } from './dtos/update-partial-user.query.dto';
import { UsersPreloadService } from './services/users-preload.service';

@Controller('users')
class UsersController {
  constructor(
    private readonly _userService: UsersService,
    private readonly _usersPreloadService: UsersPreloadService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  @Roles(
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.TeamLead,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
  )
  async createUser(
    @Body(new SchemaValidationPipe(CreateUserDto))
    registrationPayload: CreateUserDto,
    @Req() req: IRequest,
  ): Promise<Error | IUser> {
    const res = await this._userService.createUser(registrationPayload, req);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  @Roles(
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.TeamLead,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
  )
  async getListOfUsers(
    @Req() req: IRequest,
    @Query(new SchemaValidationPipe(FindAllAndCountDto))
    query: FindAllAndCountDto,
  ): Promise<Error | { list: IUser[]; count: number }> {
    const res = await this._userService.getList(req, query);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/preload-agents')
  @Roles(
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
    UserRole.TeamLead,
  )
  async preloadAgentList(
    @Req() req: IRequest,
    @Query(new SchemaValidationPipe(FindAllAndCountDto))
    query: FindAllAndCountDto,
  ): Promise<Error | { list: IUser[]; count: number }> {
    const res = await this._usersPreloadService.preloadAgentList(req, query);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/preload-company')
  @Roles(
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
    UserRole.TeamLead,
  )
  async preloadCompanyList(
    @Req() req: IRequest,
    @Query(new SchemaValidationPipe(FindAllAndCountDto))
    query: FindAllAndCountDto,
  ): Promise<Error | { list: IUser[]; count: number }> {
    const res = await this._usersPreloadService.preloadCompanyList(req, query);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/preload-team-leads')
  @Roles(
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
  )
  async preloadTeamLeadList(
    @Req() req: IRequest,
    @Query(new SchemaValidationPipe(FindAllAndCountDto))
    query: FindAllAndCountDto,
  ): Promise<Error | { list: IUser[]; count: number }> {
    const res = await this._usersPreloadService.preloadTeamLeadList(req, query);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:userId')
  @Roles(
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
  )
  async getUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Error | UserEntity> {
    const res = await this._userService.getUser(userId);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/current')
  async getCurrentUser(@Req() req: IRequest): Promise<Error | UserEntity> {
    const res = await this._userService.getCurrentUser(req);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:userId')
  @Roles(
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
  )
  async updateSale(
    @Param('userId', ParseIntPipe) userId: number,
    @Body(new SchemaValidationPipe(PartialUpdateUserDto))
    updatePayload: PartialUpdateUserDto,
    @Query(new SchemaValidationPipe(UpdatePartialUserQueryDto))
    query: UpdatePartialUserQueryDto,
  ): Promise<Error | UserEntity> {
    const res = await this._userService.updateUser(
      userId,
      updatePayload,
      query,
    );
    return res;
  }
}

export { UsersController };
