import { Injectable } from '@nestjs/common';
import { TraderEntity } from '../../traders/traders.entity';

export interface IMappedTrader extends TraderEntity {
  crmUserId: number;
  ftdDate: string | null;
  lastDepositDate: string | null;
}
export interface IMappedTradersObj {
  mappedTradersToBrands: any;
  mappedTraders: IMappedTrader[];
}

@Injectable()
export class TradersFromStandpointMapper {
  mapTradersFromStandpoint({
    filteredTradersToUpdate,
    reversedList,
  }): IMappedTradersObj {
    const mappedTraders = [];
    const mappedTradersToBrands = [];

    const hashMapTrader = {};

    reversedList.forEach((item) => {
      hashMapTrader[item.trader.id] = [item.trader];
    });

    filteredTradersToUpdate.forEach((trader, idx) => {
      mappedTraders.push({
        id: reversedList[idx].trader.id,
        lastLoginAt:
          trader['Trader.Last Login'] !== 'Empty' &&
          new Date(hashMapTrader[reversedList[idx].trader.id].lastLoginAt) <
            new Date(trader['Trader.Last Login'])
            ? trader['Trader.Last Login']
            : trader['Trader.Last Login'] !== 'Empty' &&
              new Date(hashMapTrader[reversedList[idx].trader.id].lastLoginAt) >
                new Date(trader['Trader.Last Login'])
            ? hashMapTrader[reversedList[idx].trader.id].lastLoginAt
            : null,
        ftd:
          hashMapTrader[reversedList[idx].trader.id].ftd <
          trader['Trader.Is Ftd']
            ? trader['Trader.Is Ftd']
            : hashMapTrader[reversedList[idx].trader.id].ftd,
        registeredAt:
          new Date(hashMapTrader[reversedList[idx].trader.id].registeredAt) <
          new Date(trader['Trader.Registered At'])
            ? hashMapTrader[reversedList[idx].trader.id].registeredAt
            : trader['Trader.Registered At'],
      });

      mappedTradersToBrands.push({
        id: reversedList[idx].id,

        crmTraderId: trader['Trader.ID'],

        lastLoginAt:
          trader['Trader.Last Login'] === 'Empty'
            ? null
            : trader['Trader.Last Login'],

        ftd: trader['Trader.Is Ftd'],
        lastDepositDate:
          trader['Trader.Last Deposit Date'] === 'Empty'
            ? null
            : trader['Trader.Last Deposit Date'],
        ftdDate:
          trader['Trader.Ftd Date'] === 'Empty'
            ? null
            : trader['Trader.Ftd Date'],
      });
    });

    return { mappedTradersToBrands, mappedTraders };
  }
}
