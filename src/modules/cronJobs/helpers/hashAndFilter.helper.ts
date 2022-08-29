import { Injectable } from '@nestjs/common';

@Injectable()
export class HashAndFilterHelper {
  hashAndFilter(reversedList, tradersToUpdate): any {
    const hashMapTraderId = {};

    reversedList.forEach((item) => {
      hashMapTraderId[item.crmTraderId] = null;
    });

    const filteredTradersToUpdate = [];

    tradersToUpdate.forEach((trader) => {
      if (typeof hashMapTraderId[trader['Trader.ID']] !== 'undefined') {
        filteredTradersToUpdate.push(trader);
      }
    });

    return filteredTradersToUpdate;
  }
}
