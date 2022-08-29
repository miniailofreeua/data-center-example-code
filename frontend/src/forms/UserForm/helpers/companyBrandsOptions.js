export default function companyBrandsOptions(current) {
  if (current?.userBrands && current?.userBrands.length > 0) {
    return current?.userBrands.map(({ brand }) => ({
      label: brand?.name,
      value: brand?.id,
    }));
  } else {
    return [];
  }
}
