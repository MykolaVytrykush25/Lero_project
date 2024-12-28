export enum PaymentStatuses {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
  CANCELED = "canceled",
}

export enum PaymentTypes {
  CRYPTOMUS = "cryptomus",
  BALANCE = "balance",
}

export enum ProductTypes {
  ALL = "all",
  PROXY = "proxy",
  ACCOUNT = "account",
  KYC = "kyc",
}

export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
  SELLER = "seller",
  TEMP_USER = "temp_user",
  TG_USER = "tg_user"
}

export enum TransactionStatuses {
  PAID = "paid",
  PAID_OVER = "paid_over",
  WRONG_AMOUNT = "wrong_amount",
  PROCESS = "process",
  CONFIRM_CHECK = "confirmation_check",
  CONFIRMATIONS = "confirmations",
  WRONG_AMOUNT_WAITING = "wrong_amount_waiting",
  CHECK = "check",
  FAIL = "fail",
  CANCEL = "cancel",
  SYSTEM_FAIL = "system_fail",
  REFUND_PROCCESS = "refund_process",
  REFUND_FAIL = "refund_fail",
  REFUND_PAID = "refund_paid",
  LOCKED = "locked",
}

export enum Units {
  GB = "GB",
}

export enum ImageTypes {
  BANNER = "banner",
  AVATAR = "avatar",
}
