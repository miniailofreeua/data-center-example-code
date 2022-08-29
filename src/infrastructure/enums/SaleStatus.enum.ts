export enum SaleStatus {
  Paid = 'paid',
  Stuck = 'stuck',
  Bounced = 'bounced',
  StuckBounced = 'stuckBounced',
  CallBack = 'callBack',
  PendingPOP = 'pendingPOP',
  PendingWithoutPOP = 'pendingWithoutPOP',
  Canceled = 'canceled',
  Withdrawal = 'withdrawal',
}

export const SaleStatusLabel = {
  [SaleStatus.Paid]: 'Paid',
  [SaleStatus.Stuck]: 'Stuck',
  [SaleStatus.Bounced]: 'Bounced',
  [SaleStatus.StuckBounced]: 'Stuck/Bounced',
  [SaleStatus.CallBack]: 'Call Back',
  [SaleStatus.PendingPOP]: 'Pending POP',
  [SaleStatus.PendingWithoutPOP]: 'Pending Without POP',
  [SaleStatus.Canceled]: 'Canceled',
  [SaleStatus.Withdrawal]: 'Withdrawal',
};

export const SaleStatusListOptions = Object.entries(SaleStatusLabel).map(
  ([saleKey, saleLabel]) => ({
    key: saleKey,
    label: saleLabel,
  }),
);
