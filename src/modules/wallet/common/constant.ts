export enum WalletTransactionType {
  DEPOSIT = 'DEPOSIT',
  SERVICE_PAYMENT = 'SERVICE_PAYMENT',
}

export enum WalletTransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  CANCELLED = 'CANCELLED',
}

export enum WalletTransactionDescription {
  DEPOSIT = 'Nạp tiền vào ví',
  SERVICE_PAYMENT = 'Thanh toán dịch vụ',
}

export enum PayosStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}
// Deposit money package as array and have promotion
export const DEPOSIT_PACKAGE = [
  {
    amount: 2000,
    promotion: 0,
  },
  {
    amount: 50000,
    promotion: 0,
  },
  {
    amount: 100000,
    promotion: 0,
  },
  {
    amount: 200000,
    promotion: 10000,
  },
  {
    amount: 500000,
    promotion: 30000,
  },
  { amount: 1000000, promotion: 80000 },
  {
    amount: 2000000,
    promotion: 200000,
  },
];
