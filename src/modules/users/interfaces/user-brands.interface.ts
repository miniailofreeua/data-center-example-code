export interface IUserBrands {
  id: number;
  brandId: number;
  userId: number;
}

export type ICreateUserBrandsPayload = { brandId: number };

export type IUpdateUserBrandsPayload = IUserBrands;
