export enum WithdrawalMethod {
  BankWire = 'bankWire',
  CreditCard = 'creditCard',
  BTC = 'BTC',
}

export const WithdrawalMethodLabel = {
  [WithdrawalMethod.BankWire]: 'Bank Wire',
  [WithdrawalMethod.CreditCard]: 'Credit Card',
  [WithdrawalMethod.BTC]: 'BTC',
};

export const WithdrawalMethodListOptions = Object.entries(
  WithdrawalMethodLabel,
).map(([value, label]) => ({
  value,
  label,
}));
