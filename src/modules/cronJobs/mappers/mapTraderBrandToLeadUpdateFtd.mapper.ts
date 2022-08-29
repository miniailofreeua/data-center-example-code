import { TraderToBrandEntity } from 'src/modules/tradersToBrands/tradersToBrands.entity';

export type UpdateLeadFtdT = {
  id: number;
  ftd: boolean;
  ftdDate: Date;
};

export default (traderToBrand: TraderToBrandEntity): UpdateLeadFtdT => {
  const { leadId, ftd, ftdDate } = traderToBrand;
  return {
    id: leadId,
    ftd: ftd === 0,
    ftdDate,
  };
};
