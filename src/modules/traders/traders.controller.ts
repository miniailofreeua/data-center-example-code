import {
  Controller,
  Post,
  UseGuards,
  Req,
  Query,
  Body,
  Get,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { UserRole } from 'src/infrastructure/enums/UserRole.enum';

import { ImportTradersService } from './services/import-traders.service';

import { FastifyRequest } from 'fastify';
import { UserEntity } from 'src/modules/users/users.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ImportCustomFieldsService } from './importCustomFields/importCustomFields.service';
export interface IReqCsv extends FastifyRequest {
  user: UserEntity;
}

@Controller('traders')
class TradersController {
  constructor(
    private readonly _importTradersService: ImportTradersService,
    private readonly _importCustomFieldsService: ImportCustomFieldsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/import')
  @Roles(UserRole.Admin, UserRole.SuperManager)
  async createTrader(
    @Req() req: IReqCsv,
    @Query() query: any,
  ): Promise<Error | any> {
    const res = await this._importTradersService.importCsv(
      req,
      Number(query.brandId),
    );
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('import/fields')
  @Roles(UserRole.Admin, UserRole.SuperManager)
  async createOrUpdate(
    @Body()
    payload: any,
  ): Promise<any> {
    const res = await this._importCustomFieldsService.createUpdateOrDelete(
      payload,
    );
    return res;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('import/fields')
  @Roles(UserRole.Admin, UserRole.SuperManager)
  async getList(): Promise<any> {
    const res = await this._importCustomFieldsService.getList();
    return res;
  }
}

export { TradersController };
