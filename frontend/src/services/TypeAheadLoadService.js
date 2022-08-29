import { Brands, Users } from '../API/api';

function _createOption(item) {
  const { firstName, lastName, id, name } = item;
  const label = firstName && lastName ? `${firstName} ${lastName}` : name;
  return {
    value: id,
    label,
  };
}

class TypeAheadLoadService {
  static loadBrands({ selectedId }, value) {
    const config = {
      searchText: value ? value : '',
      ...(selectedId ? { selectedId } : {}),
    };

    return Brands.getBrandsRequest(config).then((result) =>
      result.list ? result.list.map((item) => _createOption(item)) : null,
    );
  }

  static loadUsers({ selectedId, role }, value) {
    const config = {
      searchText: value ? value : '',
      role,
      // TODO: add on backend
      ...(selectedId ? { selectedId } : {}),
    };

    return Users.getUsersRequest(config).then((result) =>
      result.list ? result.list.map((item) => _createOption(item)) : null,
    );
  }
}

export default TypeAheadLoadService;
