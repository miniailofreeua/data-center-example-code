import { concat } from 'lodash';
import { BrandEntity } from '../brands.entity';
import { PartialUpdateBrandDto } from '../dtos/partial-update-brand-dto';
import { isBrandApiDataChangedOrNew } from './isBrandApiDataChangedOrNew.helper';
import { isBrandApiDataValid } from './isBrandApiDataValid.helper';

export const getBrandPullApisToRestart = (
  brand: BrandEntity,
  payload: PartialUpdateBrandDto,
) => {
  const brandPullApisToRestart = brand.brandPullApis.filter((bPA) => {
    const isNewBrandPullApi = payload.brandPullApis.some((payload) =>
      isBrandApiDataChangedOrNew(payload, bPA),
    );
    return isNewBrandPullApi;
  });
  return brandPullApisToRestart;
};

export const getBrandPullApisToCreate = (payload: PartialUpdateBrandDto) => {
  const newBrandPullApisToCreate =
    payload.brandPullApis.filter(isBrandApiDataValid);
  return newBrandPullApisToCreate;
};

export const getBrandPullApisToTerminate = (
  brand: BrandEntity,
  payload: PartialUpdateBrandDto,
) => {
  const brandPullApisToTerminate = brand.brandPullApis.filter((bPA) => {
    const wasRemovedFromPayload = !payload.brandPullApis.some(
      (payload) => payload.id === bPA.id,
    );
    return wasRemovedFromPayload;
  });
  return brandPullApisToTerminate;
};
