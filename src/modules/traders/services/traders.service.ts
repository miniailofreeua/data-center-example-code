import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between } from 'typeorm';
import { FindDuplicatesHelper } from 'src/modules/cronJobs/helpers/findDuplicate.helper';
import { TraderToBrandEntity } from 'src/modules/tradersToBrands/tradersToBrands.entity';
import { TradersToBrandsRepository } from 'src/modules/tradersToBrands/tradersToBrands.repository';
import { CreateTraderDto } from '../dto/create-trader.dto';
import { HashAndFilterHelper } from '../helpers/hashAndFilter.helper';
import { ICreateTraders } from '../interfaces/trader.interface';
import { TraderEntity } from '../traders.entity';
import { TradersRepository } from '../traders.repository';

@Injectable()
export class TradersService {
  constructor(
    @InjectRepository(TradersRepository)
    private readonly _tradersRepository: TradersRepository,
    private readonly _traderToBrandsRepository: TradersToBrandsRepository,
    private readonly _findDuplicates: FindDuplicatesHelper,
    private readonly _hashAndFilter: HashAndFilterHelper,
  ) {}

  public async bulkCreate(traders): Promise<TraderEntity[]> {
    return this._tradersRepository.bulkCreate(traders);
  }

  public async createEntities(
    traders: CreateTraderDto[],
  ): Promise<TraderEntity[]> {
    return this._tradersRepository.createEntities(traders);
  }

  public async updateTrader(id: number, payload: Partial<TraderEntity>) {
    const trader = await this._tradersRepository.findOne(id);
    const data = Object.assign(trader, payload);
    return this._tradersRepository.update(id, data);
  }

  public async createTrader(trader: CreateTraderDto): Promise<TraderEntity> {
    return this._tradersRepository.createOrUpdate(trader);
  }

  public async create({ queryArray, mappedTraders }: ICreateTraders): Promise<{
    createdTraders: TraderEntity[];
    filteredTradersToBrands: TraderToBrandEntity[];
    filteredTradersToBrandsDuplicateAccount: TraderToBrandEntity[];
  }> {
    const duplicates = await this._findDuplicates.findDuplicates(queryArray);

    const {
      filteredTraders,
      filteredTradersToBrands,
      filteredTradersToBrandsDuplicateAccount,
    } = this._hashAndFilter.hashAndFilter(duplicates, mappedTraders);

    const createdTraders = await this.bulkCreate(filteredTraders);

    return {
      createdTraders,
      filteredTradersToBrands,
      filteredTradersToBrandsDuplicateAccount,
    };
  }

  async getAllTraders(min: number, max: number) {
    return await this._tradersRepository.find({
      id: Between(min, max),
    });
  }

  async getLastTrader() {
    return await this._tradersRepository.findOne({
      order: { id: 'DESC' },
    });
  }

  async findAndCount(query) {
    const { take, skip } = query;
    const [result, total] = await this._tradersRepository.findAndCount({
      order: { id: 'DESC' },
      take,
      skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  async findOne(query) {
    return await this._tradersRepository.findOne(query);
  }

  async findByQuery(query) {
    return await this._tradersRepository.findByQuery(query);
  }

  async findManyByQuery(query): Promise<TraderEntity[]> {
    return await this._tradersRepository.findManyByQuery(query);
  }

  async findMany(query): Promise<TraderEntity[]> {
    return await this._tradersRepository.findMany(query);
  }
}
