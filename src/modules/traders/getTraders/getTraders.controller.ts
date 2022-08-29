import { Body, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Query, Controller } from '@nestjs/common';
import { IRequest } from 'src/infrastructure/interfaces/request.interface';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

import { GetTradersService } from './getTraders.service';

@Controller('getTraders')
class GetTradersController {
  constructor(private readonly _getTradersService: GetTradersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getList(@Req() req: IRequest, @Query() query: any): Promise<any> {
    const result = await this._getTradersService.getList(query, req);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/profiles')
  async handleGetTradersProfile(@Body() { payload }: any): Promise<any> {
    const result = await this._getTradersService.getProfile(payload);

    return result;
  }
}

export { GetTradersController };
