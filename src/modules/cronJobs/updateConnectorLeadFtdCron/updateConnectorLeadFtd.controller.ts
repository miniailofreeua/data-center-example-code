import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UpdateConnectorLeadFtdService } from './updateConnectorLeadFtd.service';

@Controller('updateConnectorLeadFtd')
class UpdateConnectorLeadFtdController {
  constructor(
    private readonly _updateConnectorLeadFtdService: UpdateConnectorLeadFtdService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async updateConnectorLeadFtd() {
    const res =
      await this._updateConnectorLeadFtdService.updateConnectorLeadFtd();
    return res;
  }
}

export { UpdateConnectorLeadFtdController };
