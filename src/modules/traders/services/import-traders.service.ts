import { BadRequestException, Injectable } from '@nestjs/common';
import { isEmpty, mapValues, pick, zipObject } from 'lodash';
import xlsx from 'node-xlsx';

import { TradersRepository } from '../traders.repository';
import schema from './traders-import-schema';
import { BrandsRepository } from 'src/modules/brands/brands.repository';
import { TradersService } from './traders.service';
import { MapTradersHelper } from '../helpers/map.helper';
import { IImportTrader } from '../interfaces/import-trader.interface';
import { IFailedTraders } from 'src/modules/tradersWebhooks/interfaces/lead-data.interface';
import { IReqCsv } from '../traders.controller';
import { ImportCustomFieldsRepository } from '../importCustomFields/importCustomFields.repository';

const findSchemaField = (schema, fieldName): any =>
  Object.values(schema).find((el: any) => {
    return el.fieldName === fieldName;
  });

@Injectable()
export class ImportTradersService {
  constructor(
    private readonly _tradersService: TradersService,
    private readonly _tradersRepository: TradersRepository,
    private readonly _brandsRepository: BrandsRepository,
    private readonly _mapTradersHelper: MapTradersHelper,
    private readonly _importCustomFieldsRepository: ImportCustomFieldsRepository,
  ) {}

  public async saveTraders(
    brandId: number,
    traders: IImportTrader[],
    affiliateId?: number,
    createdById?: number,
  ) {
    const mappedCascadeTraders = traders.map((t) =>
      this._mapTradersHelper.mapTraderToSaveEntity(t, brandId, affiliateId),
    );

    const existTradersByCrmId = await this._tradersRepository.find({
      where: this._mapTradersHelper.mapToFindByCrmIdAndBrand(traders, brandId),
      relations: ['traderCredentials', 'traderBrand'],
    });

    /*
      Traders with one entity of traderBrand and all credentials,
       which was found by crmTraderId and brandId
      
      Though, if there is no such traderBrand, we can insert new one
        and update olds OR insert new credentials
        **
          To insert new one and connect to the same traderId 
          -> we need to find it by phone/email to get traderId
        **
      
      If there is already exists such traderBrand -> we update him with new info
        and update olds OR insert new credentials
    */

    const notFoundTraders = traders.filter(
      (t) =>
        !existTradersByCrmId.some(
          (d) => d.traderBrand.crmTraderId === t.crmTraderId,
        ),
    );

    const existTradersByCredentials = await this.getTradersByCredentials(
      notFoundTraders,
    );

    const tradersToSave = mappedCascadeTraders.map((t) =>
      this._mapTradersHelper.mapCascadeTraderToSaveEntity(
        t,
        existTradersByCrmId,
        existTradersByCredentials,
      ),
    );

    await this._tradersService.createEntities(tradersToSave);

    const failedTraders = existTradersByCrmId.map((et) => ({
      ...et,
      lead: traders.filter((t) => t.crmTraderId === et.traderBrand.crmTraderId),
      brandId,
      affiliateId,
      createdById,
    }));

    return {
      failedTraders: (failedTraders as IFailedTraders[]) || [],
      uploadedTraders: notFoundTraders || [],
    };
  }

  async getTradersByCredentials(notFoundTraders) {
    const existTraders = await this._tradersRepository.find({
      where: this._mapTradersHelper.mapToFindByEmailOrPhone(notFoundTraders),
      relations: ['traderCredential', 'traderBrands', 'traderCredentials'],
    });

    return existTraders;
  }

  getSchemaKey(schema, elementToFind) {
    return Object.keys(schema).find(
      (schemaField) =>
        schemaField.trim().toLowerCase() === elementToFind.trim().toLowerCase(),
    );
  }

  async getMappedCsv(csvArray) {
    if (isEmpty(csvArray)) {
      return {};
    }

    const customFieldsArr = await this._importCustomFieldsRepository.find();
    const customFields = {};

    customFieldsArr.forEach((f) => {
      customFields[f.key] = { fieldName: f.columnName };
    });

    const csvHeader = csvArray[0];
    const csvBody = csvArray.slice(1);

    const headerSchema = csvHeader.map((el) => {
      if (customFields[this.getSchemaKey(customFields, el)]) {
        return customFields[this.getSchemaKey(customFields, el)].fieldName;
      }

      // if (schema[this.getSchemaKey(schema, el)]) {
      //   return schema[this.getSchemaKey(schema, el)].fieldName;
      // }

      return null;
    });

    const schemaFields = Object.values(schema).map(
      (schemaField) => schemaField.fieldName,
    );

    const mappedCsv = csvBody.map((el) => {
      return pick(zipObject(headerSchema, el), schemaFields);
    });

    const modifiedCsv = mappedCsv.map((el) => {
      const mappedTrader = mapValues(el, (value, key) => {
        const schemaField = findSchemaField(schema, key);
        if (schemaField.hasOwnProperty('modify') && value !== null) {
          return schemaField.modify(value);
        }
        return value;
      });
      return mappedTrader;
    });

    return modifiedCsv;
  }

  public async importCsv(req: IReqCsv, brandId: number): Promise<any> {
    if (!req.isMultipart()) {
      return new BadRequestException('Request is not multipart');
    }
    const brand = await this._brandsRepository
      .createQueryBuilder('brands')
      .where('brands."id" = :brandId', {
        brandId,
      })
      .getOne();

    if (!brand) {
      return new BadRequestException('Brand is not exist');
    }

    const file = await req.file();

    const buffer = await file.toBuffer();
    const workSheetsFromBuffer = xlsx.parse(buffer, {
      cellDates: true,
      blankrows: false,
    });
    const [{ data }] = workSheetsFromBuffer;
    const traders = (await this.getMappedCsv(data)) as IImportTrader[];
    return this.saveTraders(brandId, traders);
  }
}
