import { Injectable } from '@nestjs/common';

@Injectable()
export class PullTradersFromStandpointMapHelper {
  public async mapFilteredTraderToBrands({
    brand,
    createdTraders,
    filteredTradersToBrands,
    filteredTradersToBrandsDuplicateAccount,
  }): Promise<any> {
    const mappedFilteredTraderToBrands = [];
    const mappedFilteredTraderCredentials = [];

    const hashMapPhone = {};

    filteredTradersToBrandsDuplicateAccount.forEach((item, idx) => {
      if (typeof hashMapPhone[item.phone] === 'undefined') {
        hashMapPhone[item.phone] = [idx];
      } else {
        if (typeof hashMapPhone[item.phone][idx] === 'undefined') {
          hashMapPhone[item.phone] = [...hashMapPhone[item.phone], idx];
        }
      }
    });

    filteredTradersToBrands.forEach((trader, idx: number) => {
      mappedFilteredTraderToBrands.push({
        traderId: createdTraders[idx].id,
        brandId: brand.id,

        firstName: trader?.firstName,
        lastName: trader?.lastName,

        crmTraderId: trader?.crmTraderId,

        ftd: trader?.ftd,

        ...(trader?.ftdDate && {
          ftdDate: trader?.ftdDate,
        }),

        balance: trader?.balance,

        ...(trader?.lastLoginAt && {
          lastLoginAt: trader?.lastLoginAt,
        }),

        ...(trader?.lastDepositDate && {
          lastDepositDate: trader?.lastDepositDate,
        }),

        affiliateId: trader?.affiliateId,

        importId: trader?.importId,

        campaignName: trader?.campaignName,
        subCampaignName: trader?.subCampaignName,
      });

      mappedFilteredTraderCredentials.push({
        traderId: createdTraders[idx].id,

        brandId: brand?.id,

        email: trader?.email,
        phone: trader?.phone,
      });

      if (typeof hashMapPhone[trader.phone] !== 'undefined') {
        hashMapPhone[trader.phone].forEach((trader) => {
          mappedFilteredTraderToBrands.push({
            traderId: createdTraders[idx]?.id,
            brandId: brand?.id,

            firstName:
              filteredTradersToBrandsDuplicateAccount[trader]?.firstName,
            lastName: filteredTradersToBrandsDuplicateAccount[trader]?.lastName,

            crmTraderId:
              filteredTradersToBrandsDuplicateAccount[trader]?.crmTraderId,

            ftd: filteredTradersToBrandsDuplicateAccount[trader]?.ftd,

            ...(filteredTradersToBrandsDuplicateAccount[trader]?.ftdDate && {
              ftdDate: filteredTradersToBrandsDuplicateAccount[trader]?.ftdDate,
            }),

            balance: filteredTradersToBrandsDuplicateAccount[trader]?.balance,

            ...(filteredTradersToBrandsDuplicateAccount[trader]
              ?.lastLoginAt && {
              lastLoginAt:
                filteredTradersToBrandsDuplicateAccount[trader]?.lastLoginAt,
            }),

            ...(filteredTradersToBrandsDuplicateAccount[trader]
              ?.lastDepositDate && {
              lastDepositDate:
                filteredTradersToBrandsDuplicateAccount[trader]
                  ?.lastDepositDate,
            }),

            affiliateId:
              filteredTradersToBrandsDuplicateAccount[trader]?.affiliateId,

            importId: filteredTradersToBrandsDuplicateAccount[trader]?.importId,

            campaignName:
              filteredTradersToBrandsDuplicateAccount[trader]?.campaignName,

            subCampaignName:
              filteredTradersToBrandsDuplicateAccount[trader]?.subCampaignName,
          });

          mappedFilteredTraderCredentials.push({
            traderId: createdTraders[idx]?.id,
            brandId: brand?.id,

            email: filteredTradersToBrandsDuplicateAccount[trader]?.email,
            phone: filteredTradersToBrandsDuplicateAccount[trader]?.phone,
          });
        });
      }
    });

    if (
      filteredTradersToBrands?.length === 0 &&
      filteredTradersToBrandsDuplicateAccount?.length > 0
    ) {
      filteredTradersToBrandsDuplicateAccount.forEach((trader, idx) => {
        hashMapPhone[trader.phone].forEach((trader) => {
          mappedFilteredTraderToBrands.push({
            traderId: createdTraders[idx]?.id,
            brandId: brand?.id,

            firstName:
              filteredTradersToBrandsDuplicateAccount[trader]?.firstName,
            lastName: filteredTradersToBrandsDuplicateAccount[trader]?.lastName,

            crmTraderId:
              filteredTradersToBrandsDuplicateAccount[trader]?.crmTraderId,

            ftd: filteredTradersToBrandsDuplicateAccount[trader]?.ftd,

            ...(filteredTradersToBrandsDuplicateAccount[trader]?.ftdDate && {
              ftdDate: filteredTradersToBrandsDuplicateAccount[trader]?.ftdDate,
            }),

            balance: filteredTradersToBrandsDuplicateAccount[trader]?.balance,

            ...(filteredTradersToBrandsDuplicateAccount[trader]
              ?.lastLoginAt && {
              lastLoginAt:
                filteredTradersToBrandsDuplicateAccount[trader]?.lastLoginAt,
            }),

            ...(filteredTradersToBrandsDuplicateAccount[trader]
              ?.lastDepositDate && {
              lastDepositDate:
                filteredTradersToBrandsDuplicateAccount[trader]
                  ?.lastDepositDate,
            }),

            affiliateId:
              filteredTradersToBrandsDuplicateAccount[trader]?.affiliateId,

            importId: filteredTradersToBrandsDuplicateAccount[trader]?.importId,

            campaignName:
              filteredTradersToBrandsDuplicateAccount[trader]?.campaignName,

            subCampaignName:
              filteredTradersToBrandsDuplicateAccount[trader]?.subCampaignName,
          });

          mappedFilteredTraderCredentials.push({
            traderId: createdTraders[idx]?.id,
            brandId: brand?.id,

            email: filteredTradersToBrandsDuplicateAccount[trader]?.email,
            phone: filteredTradersToBrandsDuplicateAccount[trader]?.phone,
          });
        });
      });
    }
    return {
      mappedFilteredTraderToBrands,
      mappedFilteredTraderCredentials,
    };
  }
}
