import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TraderCredentialsEntity } from './traderCredentials.entity';
import { TraderCredentialsRepository } from './traderCredentials.repository';

@Injectable()
export class TraderCredentialsService {
  constructor(
    @InjectRepository(TraderCredentialsRepository)
    private readonly _traderCredentialsRepository: TraderCredentialsRepository,
  ) {}

  findAll(): Promise<any> {
    return this._traderCredentialsRepository.find();
  }

  async find(payload): Promise<any> {
    return this._traderCredentialsRepository.findByQuery(payload);
  }

  async findOne(payload) {
    return this._traderCredentialsRepository.findOne(payload);
  }

  public async createAndReturn(
    mappedFilteredTraderCredentials: TraderCredentialsEntity[],
  ): Promise<TraderCredentialsEntity[]> {
    const createdCredentials =
      await this._traderCredentialsRepository.bulkCreate(
        mappedFilteredTraderCredentials,
      );

    return createdCredentials;
  }
}
