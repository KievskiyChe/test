export enum Popup {
  CLAIM = "claim",
  TOKEN_SELECT_FROM = "token-select-from",
  TOKEN_SELECT_TO = "token-select-to",
  INVALID_NETWORK = "invalid-network",
  AUTH = "auth",
}

export enum INotificationStatus {
  INFO = "info",
  SUBMITTED = "submitted",
  ERROR = "error",
  PENDING = "pending",
  EXPIRED = "expired",
}

export interface Globals {
  readonly userAddress?: string;
  readonly provider?: Provider;
  readonly signer?: Signer;
}
