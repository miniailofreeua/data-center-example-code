import { concat } from 'lodash';
import { BrandEntity } from '../brands.entity';
import { PartialUpdateBrandDto } from '../dtos/partial-update-brand-dto';
import { isBrandApiDataChangedOrNew } from './isBrandApiDataChangedOrNew.helper';
import { isBrandApiDataValid } from './isBrandApiDataValid.helper';

export const getBrandUpdateApisToRestart = (
  brand: BrandEntity,
  payload: PartialUpdateBrandDto,
) => {
  const brandUpdateApisToRestart = brand.brandUpdateApis.filter((bPA) => {
    const isNewBrandUpdateApi = payload.brandUpdateApis.find((payload) =>
      isBrandApiDataChangedOrNew(payload, bPA),
    );
    return isNewBrandUpdateApi;
  });
  const newBrandUpdateApisToCreate =
    payload.brandUpdateApis.filter(isBrandApiDataValid);

  return concat(brandUpdateApisToRestart, newBrandUpdateApisToCreate);
};

export const getBrandUpdateApisToTerminate = (
  brand: BrandEntity,
  payload: PartialUpdateBrandDto,
) => {
  const brandUpdateApisToTerminate = brand.brandUpdateApis.filter((bPA) => {
    const wasRemovedFromPayload = !payload.brandUpdateApis.some(
      (payload) => payload.id === bPA.id,
    );
    return wasRemovedFromPayload;
  });
  return brandUpdateApisToTerminate;
};
