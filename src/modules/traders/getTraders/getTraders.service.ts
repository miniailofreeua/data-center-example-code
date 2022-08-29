import { Injectable } from '@nestjs/common';
import { TraderCredentialsService } from 'src/modules/traderCredentials/traderCredentials.service';
import { TradersToBrandsService } from 'src/modules/tradersToBrands/tradersToBrand.service';
import { TradersService } from '../services/traders.service';
import { getTradersOptionsFromQuery } from './helpers/getTradersOptionsFromQuery';

@Injectable()
export class GetTradersService {
  constructor(
    private readonly _tradersService: TradersService,
    private readonly _tradersToBrandsService: TradersToBrandsService,
    private readonly _traderCredentialsService: TraderCredentialsService,
  ) {}

  public async getLastOne(): Promise<any> {
    const lastTrader = await this._tradersService.getLastTrader();
    return lastTrader;
  }

  public async getList(query, req) {
    const { take = 100, skip = 0 } = query;
    const { where, relations } = getTradersOptionsFromQuery(req.user);

    const { list, count } = await this._tradersToBrandsService.findAndCount(
      take,
      skip,
      where,
      relations,
    );

    return { list, count };
  }

  public async getProfile(payload): Promise<any> {
    const traderToBrandsProfiles = await this._tradersToBrandsService.find({
      traderId: payload.traderId,
    });

    const trader = await this._tradersService.findByQuery({
      id: payload.traderId,
    });

    const traderCredentials = await this._traderCredentialsService.find({
      traderId: payload.traderId,
    });

    return { traderToBrandsProfiles, traderCredentials, trader };
  }
}
