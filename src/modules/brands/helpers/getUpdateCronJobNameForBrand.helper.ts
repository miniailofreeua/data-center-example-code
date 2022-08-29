import { camelCase } from 'lodash';
import { BrandPullApiEntity } from '../modules/brandPullApis/brandPullApis.entity';

export const getCronJobNameForBrand = (brandPullApi: BrandPullApiEntity) =>
  `brand-${brandPullApi.brandId}-api-job-${camelCase(brandPullApi.name)}`;
