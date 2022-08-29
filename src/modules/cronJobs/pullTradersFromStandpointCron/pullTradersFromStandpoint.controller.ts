import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { StandpointCrmName } from 'src/infrastructure/enums/StandpointCrmName';
import { PullTradersFromStandpointService } from './pullTradersFromStandpoint.service';

@Controller('pullTradersFromStandpoint')
class PullTradersFromStandpointController {
  constructor(
    private readonly _pullTradersFromStandpointService: PullTradersFromStandpointService,
  ) {}

  // @Cron(CronExpression.EVERY_HOUR)
  @Get('/')
  async pullTradersFromStandpoint_finance_brand(): Promise<any> {
    const res =
      await this._pullTradersFromStandpointService.pullTradersFromStandpoint(
        StandpointCrmName.standpointfinance,
      );
    return res;
  }

  // @Cron(CronExpression.EVERY_HOUR)
  // async pullTradersFromStandpoint_tntroyal_brand(): Promise<any> {
  //   const res =
  //     await this._pullTradersFromStandpointService.pullTradersFromStandpoint(
  //       StandpointCrmName.tntroyal,
  //     );
  //   return res;
  // }

  // @Cron(CronExpression.EVERY_HOUR)
  // async pullTradersFromStandpoint_profitfx_brand(): Promise<any> {
  //   const res =
  //     await this._pullTradersFromStandpointService.pullTradersFromStandpoint(
  //       StandpointCrmName.profitfx,
  //     );
  //   return res;
  // }
}

export { PullTradersFromStandpointController };
