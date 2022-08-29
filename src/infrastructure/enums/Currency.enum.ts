export enum Currency {
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
  CHF = 'CHF',
  AUD = 'AUD',
  CAD = 'CAD',
  UAH = 'UAH',
  ILS = 'ILS',
  AED = 'AED',
  BTC = 'BTC',
  PLN = 'PLN',
}

export const CurrencyListOptions = Object.entries(Currency).map(
  ([currencyKey, currencyLabel]) => ({
    key: currencyKey,
    label: currencyLabel,
  }),
);
