import { Body, Post, Controller, Query, Put } from '@nestjs/common';
import { SchemaValidationPipe } from 'src/infrastructure/pipes/schema_validation.pipe';
import { CreateTraderEntityDto } from './dto/create-traderEntity.dto';
import { InjectTraderEntityDto } from './dto/inject-trader.dto';
import { ILeadData } from './interfaces/lead-data.interface';
import { TraderWebhookService } from './tradersWebhooks.service';

@Controller('traders')
class CheckTraderHookController {
  constructor(private readonly _traderWebhookService: TraderWebhookService) {}

  @Post('/getTraderByEmailOrPhone')
  async getTraderByEmailOrPhoneWebhook(
    @Query() { token }: { token: string },
    @Body()
    payload: GetTraderWebhook,
  ): Promise<any> {
    const result =
      await this._traderWebhookService.getTraderByEmailOrPhoneWebhook(
        token,
        payload,
      );

    return result;
  }

  @Post('/getTradersAndCheckDuplicatesWebhook')
  async getTradersAndCheckDuplicatesWebhook(
    @Query() { token }: { token: string },
    @Body()
    payload: ILeadData,
  ): Promise<any> {
    const result =
      await this._traderWebhookService.getTradersAndCheckDuplicatesWebhook(
        token,
        payload,
      );

    return result;
  }

  @Post('/create-trader-webhook')
  async createTraderWebhook(
    @Query() { token }: { token: string },
    @Body(new SchemaValidationPipe(CreateTraderEntityDto))
    payload: CreateTraderEntityDto,
  ): Promise<any> {
    const result = await this._traderWebhookService.createTraderWebhook(
      token,
      payload,
    );

    return result;
  }

  @Put('/update-trader-webhook')
  async updateTraderWebhook(
    @Query() { token }: { token: string },
    @Body(new SchemaValidationPipe(CreateTraderEntityDto))
    payload: CreateTraderEntityDto,
  ): Promise<any> {
    const result = await this._traderWebhookService.updateTraderWebhook(
      token,
      payload,
    );

    return result;
  }

  @Put('/inject-trader-to-brand-webhook')
  async injectTraderToBrandWebhook(
    @Query() { token }: { token: string },
    @Body(new SchemaValidationPipe(InjectTraderEntityDto))
    payload: InjectTraderEntityDto,
  ): Promise<any> {
    const result = await this._traderWebhookService.injectTraderToBrandWebhook(
      token,
      payload,
    );

    return result;
  }
}

export { CheckTraderHookController };
