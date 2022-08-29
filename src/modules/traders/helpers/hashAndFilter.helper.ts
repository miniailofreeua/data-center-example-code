import { Injectable } from '@nestjs/common';
import { TraderToBrandEntity } from 'src/modules/tradersToBrands/tradersToBrands.entity';
import { TraderEntity } from '../traders.entity';

export interface IReturnHashAndFilter {
  filteredTraders: TraderEntity[];
  filteredTradersToBrands: TraderToBrandEntity[];
  filteredTradersToBrandsDuplicateAccount: TraderToBrandEntity[];
}

@Injectable()
export class HashAndFilterHelper {
  hashAndFilter(duplicates, mappedTraders): IReturnHashAndFilter {
    const hashMapPhone = {};
    const hashMapEmail = {};

    const hashSelfDuplicatePhone = {};
    const hashSelfDuplicateEmail = {};

    duplicates.forEach((item) => {
      hashMapPhone[item.phone] = null;
      hashMapEmail[item.email] = null;
    });

    const filteredTraders = [];
    const filteredTradersToBrands = [];
    const filteredTradersToBrandsDuplicateAccount = [];

    mappedTraders.forEach(
      ({
        firstName,
        lastName,
        email,
        phone,
        crmTraderId,
        ftd,
        ftdDate,
        balance,
        lastLoginAt,
        lastDepositDate,
        affiliateId,
        country,
        state,
        language,
        currency,
        registeredAt,

        importId,
        campaignName,
        subCampaignName,
      }) => {
        if (
          typeof hashMapPhone[phone] === 'undefined' &&
          typeof hashMapEmail[email] === 'undefined'
        ) {
          if (
            typeof hashSelfDuplicatePhone[phone] === 'undefined' &&
            typeof hashSelfDuplicateEmail[email] === 'undefined'
          ) {
            hashSelfDuplicatePhone[phone] = null;
            hashSelfDuplicateEmail[email] = null;

            filteredTraders.push({
              firstName,
              lastName,

              country,
              state,
              language,
              currency,

              registeredAt,
              lastLoginAt,

              ftd,
            });

            filteredTradersToBrands.push({
              firstName,
              lastName,

              email,
              phone,

              crmTraderId,

              ftd,
              ftdDate,

              balance,

              lastLoginAt,
              lastDepositDate,

              affiliateId,

              importId,
              campaignName,
              subCampaignName,
            });
          } else {
            filteredTradersToBrandsDuplicateAccount.push({
              firstName,
              lastName,

              email,
              phone,

              crmTraderId,

              ftd,
              ftdDate,

              balance,

              lastLoginAt,
              lastDepositDate,

              affiliateId,

              importId,
              campaignName,
              subCampaignName,
            });
          }
        }
      },
    );

    return {
      filteredTraders,
      filteredTradersToBrands,
      filteredTradersToBrandsDuplicateAccount,
    };
  }
}
