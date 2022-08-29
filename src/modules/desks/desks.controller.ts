import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
  ParseIntPipe,
  Param,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { SchemaValidationPipe } from '../../infrastructure/pipes/schema_validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DeskEntity } from './desks.entity';
import { DesksService } from './desks.service';
import { CreateDeskDto, UpdateDeskDto } from './dtos/desk.dto';

@Controller('desks')
class DesksController {
  constructor(private readonly _desksService: DesksService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  @Roles(UserRole.Admin, UserRole.SuperManager)
  async create(
    @Body(new SchemaValidationPipe(CreateDeskDto))
    payload: CreateDeskDto,
    @Req() req: IRequest,
  ): Promise<Error | DeskEntity> {
    const res = await this._desksService.checkIfExistAndCreate(payload, req);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  @Roles(
    UserRole.Admin,
    UserRole.SuperManager,
    UserRole.Company,
    UserRole.CrmManager,
    UserRole.DeskManager,
    UserRole.TeamLead,
  )
  async getList(
    @Query() query: any,
  ): Promise<Error | { list: DeskEntity[]; count: number }> {
    const res = await this._desksService.getList(query);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:deskId')
  @Roles(UserRole.Admin, UserRole.SuperManager)
  async getDesk(
    @Param('deskId', ParseIntPipe) deskId: number,
  ): Promise<Error | DeskEntity> {
    const res = await this._desksService.getDesk(deskId);
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:deskId')
  @Roles(UserRole.Admin, UserRole.SuperManager)
  async updateDesk(
    @Param('deskId', ParseIntPipe) deskId: number,
    @Body(new SchemaValidationPipe(UpdateDeskDto))
    updatePayload: UpdateDeskDto,
  ): Promise<Error | DeskEntity> {
    const res = await this._desksService.updateDesk(deskId, updatePayload);
    return res;
  }
}

export { DesksController };
