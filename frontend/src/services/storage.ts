import Cookies from 'js-cookie';

export const storage = {
  isPresent(key: string) {
    return Cookies.get(key) ? true : false;
  },

  remove(key: string) {
    let CookiesPresent = this.isPresent(key);

    while (CookiesPresent) {
      Cookies.remove(key);
      CookiesPresent = this.isPresent(key);
    }
  },

  set(key: string, value: any) {
    this.remove(key);
    Cookies.set(key, value, { expires: 7 });
  },

  reset(key: string, value: any) {
    Cookies.set(key, value, { expires: 7 });
  },

  get(key: string) {
    return Cookies.get(key);
  },
};

export default storage;
