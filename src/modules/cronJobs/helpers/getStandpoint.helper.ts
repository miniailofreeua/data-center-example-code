import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { getStandpointApiUrl } from 'src/constants/standpoint';
import { StandpointCrmName } from 'src/infrastructure/enums/StandpointCrmName';

@Injectable()
export class GetStandpointHelper {
  async getTradersFromStandpoint(
    standpointCrmName: StandpointCrmName,
    urlParams: string,
  ): Promise<Observable<AxiosResponse<any>>> {
    const url = getStandpointApiUrl(standpointCrmName, urlParams);
    return await axios.get(url).then((res) => {
      const { data }: any = res.data;
      return data;
    });
  }
}
