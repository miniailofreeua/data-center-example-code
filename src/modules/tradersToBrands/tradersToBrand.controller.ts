import { Body, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Query, Controller } from '@nestjs/common';
import { SchemaValidationPipe } from 'src/infrastructure/pipes/schema_validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateTraderToBrandDto } from './dto/update-traderToBrand.dto';

import { TradersToBrandsService } from './tradersToBrand.service';
import { TraderToBrandEntity } from './tradersToBrands.entity';

@Controller('tradersToBrands')
class TradersToBrandsController {
  constructor(
    private readonly _tradersToBrandsService: TradersToBrandsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Put('/:deskId')
  async update(
    @Param('deskId', ParseIntPipe) deskId: number,
    @Body(new SchemaValidationPipe(UpdateTraderToBrandDto))
    updatePayload: UpdateTraderToBrandDto,
  ): Promise<Error | TraderToBrandEntity> {
    const res = await this._tradersToBrandsService.updateEntity(
      deskId,
      updatePayload,
    );
    return res;
  }
}

export { TradersToBrandsController };
