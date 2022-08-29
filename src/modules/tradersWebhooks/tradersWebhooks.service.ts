import bcrypt from 'bcrypt';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { TraderCredentialsService } from '../traderCredentials/traderCredentials.service';
import { GetTradersService } from '../traders/getTraders/getTraders.service';
import { TradersService } from '../traders/services/traders.service';
import { CreateTraderEntityDto } from './dto/create-traderEntity.dto';
import { InjectTraderEntityDto } from './dto/inject-trader.dto';
import { TradersToBrandsService } from '../tradersToBrands/tradersToBrand.service';
import { ILeadData, IResult } from './interfaces/lead-data.interface';
import { ImportTradersService } from '../traders/services/import-traders.service';

@Injectable()
export class TraderWebhookService {
  constructor(
    private readonly _traderCredentialsService: TraderCredentialsService,
    private readonly _traderToBrandsService: TradersToBrandsService,
    private readonly _importTradersService: ImportTradersService,
    private readonly _getTradersService: GetTradersService,
    private readonly _tradersService: TradersService,
  ) {}

  private async _validateWebhookToken(hash) {
    if (!hash) {
      throw new PreconditionFailedException('Token is missed');
    }
    const isMatch = bcrypt.compare(process.env.SECRET_CONNECTOR, hash);
    if (!isMatch) {
      throw new ForbiddenException('Token is not valid');
    }
  }

  public async updateTraderWebhook(token, payload: CreateTraderEntityDto) {
    await this._validateWebhookToken(token);
    const {
      leadId,
      crmTraderId,
      firstName,
      lastName,
      email,
      phone,
      brandId = null,
      isValid,
      validationError,
      sourceUrl,
      registrationIp,
      language,
      param_1,
      param_2,
      param_3,
      param_4,
      param_5,
      param_7,
      param_8,
      param_9,
    } = payload;
    const traderCredential = await this._traderCredentialsService.findOne({
      where: [{ phone }, { email }, { leadId }],
      relations: ['trader.traderBrands'],
    });
    const trader = await this._tradersService.findOne(
      traderCredential.traderId,
    );
    if (!traderCredential) {
      throw new BadRequestException('No trader in the system');
    }
    const addedBrand = trader.traderBrands.some((tb) => tb.brandId === brandId);
    const traderToUpdate = {
      ...trader,
      isValid,
      validationError,
    };
    if (!addedBrand) {
      await this._traderToBrandsService.createTraderToBrandRelation({
        brandId,
        crmTraderId,
        firstName,
        lastName,
        traderId: trader.id,
        phone,
        email,
        sourceUrl,
        registrationIp,
        language,
        param_1,
        param_2,
        param_3,
        param_4,
        param_5,
        param_7,
        param_8,
        param_9,
      });
    }

    return this._tradersService.createTrader(traderToUpdate);
  }

  public async injectTraderToBrandWebhook(
    token: string,
    payload: InjectTraderEntityDto,
  ) {
    await this._validateWebhookToken(token);
    const {
      firstName,
      lastName,
      email,
      phone,
      brandId,
      isValid,
      validationError,
    } = payload;
    const traderCredential = await this._traderCredentialsService.findOne({
      where: [{ phone }, { email }],
      relations: ['trader', 'trader.traderBrands', 'trader.traderBrands.brand'],
    });
    if (!traderCredential) {
      throw new BadRequestException('Trader is not found in the system');
    }
    const { trader } = traderCredential;
    const addedBrand = trader.traderBrands.find((tb) => tb.brandId === brandId);
    if (addedBrand) {
      throw new BadRequestException(
        `Trader is already in the brand ${addedBrand.brand.name}`,
      );
    }

    await this._traderToBrandsService.createTraderToBrandRelation({
      brandId,
      firstName,
      lastName,
      traderId: trader.id,
      phone,
      email,
    });

    const dataToUpdate = {
      isValid,
      validationError,
    };
    return await this._tradersService.updateTrader(trader.id, dataToUpdate);
  }

  public async createTraderWebhook(token, payload: CreateTraderEntityDto) {
    await this._validateWebhookToken(token);

    const {
      campaignName,
      subCampaignName,
      crmTraderId,
      firstName,
      lastName,
      email,
      phone,
      country,
      brandId = null,
      leadId = null,
      isValid,
      validationError = null,
      sourceUrl,
      registrationIp,
      language,
      param_1,
      param_2,
      param_3,
      param_4,
      param_5,
      param_6,
      param_7,
      param_8,
      param_9,
    } = payload;

    const existedTraderCredentials =
      await this._traderCredentialsService.findOne({
        where: [{ email }, { phone }],
        relations: ['trader'],
      });

    const isTraderExistInBrand =
      existedTraderCredentials &&
      (await this._traderToBrandsService.findOne({
        where: { traderId: existedTraderCredentials.trader.id, brandId },
      }));

    if (isTraderExistInBrand) {
      return { success: true, message: 'Trader is already exist in brand' };
    }

    const traderToBrandDefaultValues = {
      brandId,

      leadId,
      crmTraderId,

      firstName,
      lastName,
      phone,
      email,

      campaignName,
      subCampaignName,

      country,
      language,
      sourceUrl,
      registrationIp,
      param_1,
      param_2,
      param_3,
      param_4,
      param_5,
      param_6,
      param_7,
      param_8,
      param_9,
    };

    if (existedTraderCredentials && brandId) {
      // Trader has been added to the Brand
      return await this._traderToBrandsService.createTraderToBrandRelation({
        ...traderToBrandDefaultValues,
        traderId: existedTraderCredentials.trader.id,
      });
    }

    const traderEntityToSave = {
      firstName,
      lastName,
      country,
      isValid,
      validationError,
      traderCredential: {
        email,
        phone,
        brandId,
      },
      ...(brandId && {
        traderBrand: {
          ...traderToBrandDefaultValues,
        },
      }),
    };

    return await this._tradersService.createTrader(traderEntityToSave);
  }

  public async getTraderByEmailOrPhoneWebhook(
    token,
    { email, phone, leadId }: GetTraderWebhook,
  ) {
    await this._validateWebhookToken(token);
    const traderToBrand = await this._traderToBrandsService.findOne({
      where: { leadId },
    });
    const result = await this._traderCredentialsService.findOne({
      where: traderToBrand ? traderToBrand.traderId : [{ email }, { phone }],
      relations: ['trader'],
    });

    if (!result) {
      return null;
    }

    const traderBrands = await this._getTradersService.getList(
      {},
      { traderId: result.id },
    );

    if (traderBrands.list.length === 0) {
      return null;
    }

    return { ...result, traderBrands };
  }

  public async getTradersAndCheckDuplicatesWebhook(
    token: string,
    leadData: ILeadData,
  ): Promise<IResult> {
    const { brandId, affiliateId, leads, createdById } = leadData;

    await this._validateWebhookToken(token);

    const { failedTraders, uploadedTraders } =
      await this._importTradersService.saveTraders(
        brandId,
        leads,
        affiliateId,
        createdById,
      );

    return {
      uploadedTraders,
      failedTraders,
    };
  }
}
