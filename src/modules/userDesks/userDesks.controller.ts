import {
  Controller,
  UseGuards,
  Query,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { DeleteResult } from 'typeorm';
import { SchemaValidationPipe } from '../../infrastructure/pipes/schema_validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDeskDto } from './dtos/create-user-desk.dto';
import { UserDeskEntity } from './userDesks.entity';
import { UserDesksService } from './userDesks.service';

@Controller('userDesks')
class UserDesksController {
  constructor(private readonly _userDesksService: UserDesksService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  @Roles(UserRole.Admin, UserRole.SuperManager, UserRole.TeamLead)
  async create(
    @Body(new SchemaValidationPipe(CreateUserDeskDto))
    payload: CreateUserDeskDto,
  ): Promise<Error | UserDeskEntity> {
    const res = await this._userDesksService.createUserDesk(payload);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  @Roles(UserRole.Admin, UserRole.SuperManager, UserRole.TeamLead)
  async getList(
    @Query() query: any,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Error | DeleteResult> {
    const res = await this._userDesksService.deleteById(id);
    return res;
  }
}

export { UserDesksController };
