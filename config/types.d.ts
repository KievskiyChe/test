enum Popup {
  CLAIM = "claim",
  TOKEN_SELECT_FROM = "token-select-from",
  TOKEN_SELECT_TO = "token-select-to",
  INVALID_NETWORK = "invalid-network",
}

enum INotificationStatus {
  INFO = "info",
  SUBMITTED = "submitted",
  ERROR = "error",
  PENDING = "pending",
  EXPIRED = "expired",
}

interface INotification {
  id?: string;
  status: INotificationStatus;
  title: string;
  description: string;
  closeTimeout?: number;
}
