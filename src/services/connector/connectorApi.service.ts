import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { concatUrl } from 'src/infrastructure/helpers/concatUrl.helper';
import { UpdateLeadFtdT } from 'src/modules/cronJobs/mappers/mapTraderBrandToLeadUpdateFtd.mapper';

@Injectable()
export class ConnectorApiService {
  private connectorUrl: string;
  private token: string;
  constructor() {
    this.connectorUrl = process.env.CONNECTOR_URL;
    this.token = process.env.CONNECTOR_TOKEN;
  }

  updateTraderConnectorWebhook = async (data: UpdateLeadFtdT[]) => {
    const url = concatUrl(
      [this.connectorUrl, '/lead-webhooks/update-leads-ftd'],
      [
        {
          key: 'token',
          value: this.token,
        },
      ],
    );
    return await axios
      .put(url, data)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        if (e.code === 'ECONNREFUSED') {
          throw new NotFoundException('Connector connection error');
        }
        const message = `Connector error while updating Leads: ${
          e.message || e.response?.data?.message
        }`;
        throw new BadRequestException(message);
      });
  };
}
