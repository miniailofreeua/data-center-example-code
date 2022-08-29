import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TraderCredentialsEntity } from 'src/modules/traderCredentials/traderCredentials.entity';

import {
  IQuery,
  TraderCredentialsRepository,
} from 'src/modules/traderCredentials/traderCredentials.repository';

@Injectable()
export class FindDuplicatesHelper {
  constructor(
    @InjectRepository(TraderCredentialsRepository)
    private readonly _traderCredentialsRepository: TraderCredentialsRepository,
  ) {}

  async findDuplicates(query: IQuery[]): Promise<TraderCredentialsEntity[]> {
    const arrayDuplicate = await this._traderCredentialsRepository.findByQuery(
      query,
    );

    return arrayDuplicate;
  }
}
