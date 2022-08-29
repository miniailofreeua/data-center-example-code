import { Injectable } from '@nestjs/common';
import { merge } from 'lodash';
import { In } from 'typeorm';
import { CreateTraderDto } from '../dto/create-trader.dto';
import { IImportTrader } from '../interfaces/import-trader.interface';
import { IMappedTradersObj } from '../interfaces/trader.interface';
import { TraderEntity } from '../traders.entity';

@Injectable()
export class MapTradersHelper {
  mapCascadeTraderToSaveEntity(
    trader,
    existTradersByCrmId: TraderEntity[],
    existTradersByCred: TraderEntity[],
  ): CreateTraderDto {
    const dbTraderByCrmId = existTradersByCrmId.find(
      (t) => t.traderBrand.crmTraderId === trader.traderBrand.crmTraderId,
    );

    const dbTraderByCred = existTradersByCred.find((t) =>
      trader.traderCredentials.some(
        (d) =>
          t?.traderCredential?.email === d.email ||
          String(t?.traderCredential?.phone) === String(d.phone),
      ),
    );

    if (dbTraderByCrmId && !dbTraderByCred) {
      const newTraderCredentials = trader.traderCredentials.filter(
        (t) =>
          !dbTraderByCrmId.traderCredentials.some(
            (d) => String(t.phone) === String(d.phone) && t.email === d.email,
          ),
      );

      dbTraderByCrmId.traderCredentials = [
        ...newTraderCredentials,
        ...dbTraderByCrmId.traderCredentials,
      ];

      dbTraderByCrmId.traderBrand = merge(
        dbTraderByCrmId.traderBrand,
        trader.traderBrand,
      );

      return dbTraderByCrmId;
    }

    if (dbTraderByCred && !dbTraderByCrmId) {
      dbTraderByCred.traderBrand = {
        ...trader.traderBrand,
        traderId: dbTraderByCred.id,
      };

      const newTraderCredentials = trader.traderCredentials.filter(
        (t) =>
          !dbTraderByCred.traderCredentials.some(
            (d) => String(t.phone) === String(d.phone) && t.email === d.email,
          ),
      );

      dbTraderByCred.traderCredentials = [
        ...newTraderCredentials.map((ntc) => ({
          ...ntc,
          traderId: dbTraderByCred.id,
        })),

        ...dbTraderByCred.traderCredentials,
      ];

      delete dbTraderByCred['traderCredential'];

      return dbTraderByCred;
    }

    return trader;
  }

  mapToFindByTraderId(trader: any[]) {
    return {
      id: In(trader.map((t) => t.traderId)),
    };
  }

  mapToFindByEmailOrPhone(traders: IImportTrader[]) {
    return [
      {
        traderCredential: {
          email: In(traders.map((t) => t.email)),
        },
      },
      {
        traderCredential: {
          phone: In(traders.map((t) => t.phone)),
        },
      },
    ];
  }

  mapTraderToSaveEntity(
    trader: IImportTrader,
    brandId: number,
    affiliateId: number,
  ) {
    const {
      crmTraderId,
      importId,
      firstName,
      lastName,
      saleStatus,
      email,
      phone,
      country,
      ftdDate,
      ftd,
      balance,
      sourceCompany,
      campaignName,
      subCampaignName,
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
    } = trader;
    const traderCredentials = [
      {
        email,
        phone,
        brandId,
      },
    ];
    const traderBrand = {
      importId,
      saleStatus,
      campaignName,
      subCampaignName,
      firstName,
      lastName,
      brandId,
      crmTraderId,
      email,
      phone,
      ftd,
      ftdDate,
      country,
      balance,
      affiliateId,
      sourceCompany,

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
    };

    const traderEntity = {
      traderCredentials,
      traderBrand,
      firstName,
      lastName,
      country,
      ftd,
    };
    return traderEntity;
  }
  mapToFindByCrmIdAndBrand(traders: IImportTrader[], brandId) {
    return {
      traderBrand: {
        crmTraderId: In(traders.map(({ crmTraderId }) => crmTraderId)),
        brandId,
      },
    };
  }

  mapTradersFromStandpoint(standpointTraders): IMappedTradersObj {
    const queryArray = [];
    const mappedTraders = [];

    standpointTraders.forEach((trader) => {
      queryArray.push({
        email: trader['Trader.Email'],
        phone: trader['Trader.Phone'],
      });

      mappedTraders.push({
        firstName: trader['Trader.First Name'],
        lastName: trader['Trader.Last Name'],
        country: trader['Trader.Country'],
        state:
          trader['Trader.State'] === 'Empty' ? null : trader['Trader.State'],
        email: trader['Trader.Email'],
        phone: trader['Trader.Phone'],
        language: trader['Trader.Language'],
        currency: trader['Trader.Currency'],
        registeredAt: trader['Trader.Registered At'],
        lastLoginAt:
          trader['Trader.Last Login'] === 'Empty'
            ? null
            : trader['Trader.Last Login'],
        balance: trader['Trader.Balance'],
        ftd: trader['Trader.Is Ftd'],
        crmTraderId: trader['Trader.ID'],
        lastDepositDate:
          trader['Trader.Last Deposit Date'] === 'Empty'
            ? null
            : trader['Trader.Last Deposit Date'],
        affiliateId: trader['Affiliate.Affiliate ID'],
      });
    });

    return { queryArray, mappedTraders };
  }
}
