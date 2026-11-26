/**
 * Placeholder values for a {@link Translation} token.
 * Keys are the names used inside `${name}` markers.
 */
export interface TranslationExtras {
  [token: string]: string;
}

/**
 * Text that can be shown as-is or expanded from `${name}` placeholders.
 * Same shape as `Translation` from stanvanheumen/ngx-translations.
 */
export interface Translation {
  /** Sentence or message key, including optional `${name}` markers. */
  token: string;
  /** Values substituted into the token. */
  data: TranslationExtras;
}

export interface Notification {
  /** The identifier of the notification. */
  id?: string;
  /** Optional title. When omitted, a default is chosen from the type. */
  title?: string | Translation;
  /** The text of the notification. */
  text: string | Translation;
  /** The type of the notification. */
  type: NotificationType;
  /** Milliseconds before the notification disappears. When omitted, the service default is used. */
  timeout?: number;
  /** When true, the notification can be closed. Default is true. */
  closable?: boolean;
  /** Optional icon name. When omitted, a default is chosen from the type. */
  icon?: string;
}

export enum NotificationType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info'
}

export interface NotificationTitleOptions {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

export class NotificationOptions {
  timeout?: number;
  closable?: boolean;
  titles?: NotificationTitleOptions;
  icons?: NotificationTitleOptions;
}
