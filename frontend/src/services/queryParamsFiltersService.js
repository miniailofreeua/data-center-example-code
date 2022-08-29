import History from '../history';

class QueryParamsFiltersService {
  get pathname() {
    return History.location.pathname;
  }

  get search() {
    return History.location.search;
  }

  parseString = (value) =>
    typeof value === 'string' ? decodeURIComponent(value) : value;

  setParam = (data) => History.replace(data);

  getSearchObject = () => {
    let existingObj = {};
    this.search
      .replace('?', '')
      .split('&')
      .filter((item) => item.includes('='))
      .map((item) => item.split('='))
      .forEach((item) => {
        const val = this.parseString(item[1]);

        if (val) {
          existingObj[item[0]] = val;
        }
      });
    return existingObj;
  };

  getSearchArrParam = (name) => {
    const parameter = this.getSearchObject()[name];
    return parameter && parameter.split(',');
  };

  updateSearchObject = (object, name, value) => {
    return {
      ...object,
      [name]: value,
    };
  };

  generateSearchString = (object) => {
    let string = '';
    if (object) {
      Object.keys(object).forEach((key, index) => {
        const char = index ? '&' : '';
        const value = object[key];
        const valueExists = value !== null && value !== undefined;
        string = string.concat(valueExists ? `${char}${key}=${value}` : '');
      });
    }
    return string;
  };

  setQueryParam = (name, value) => {
    const existingSearchObject = this.getSearchObject();
    const updatedSearchObject = this.updateSearchObject(
      existingSearchObject,
      name,
      value,
    );
    const generatedSearchString =
      this.generateSearchString(updatedSearchObject);
    this.setParam({ search: generatedSearchString });
  };

  setSearchObject = (incomingObject) => {
    const existingSearchObject = this.getSearchObject();
    const newSearchObject = {
      ...existingSearchObject,
      ...incomingObject,
    };
    const generatedSearchString = this.generateSearchString(newSearchObject);
    this.setParam({ search: generatedSearchString });
  };
}

export default new QueryParamsFiltersService();
