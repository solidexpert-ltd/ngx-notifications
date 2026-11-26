import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  Notification,
  NotificationOptions,
  NotificationTitleOptions,
  NotificationType,
  Translation
} from './notifications.interface';

interface NotificationTextMap {
  [NotificationType.Success]: string;
  [NotificationType.Error]: string;
  [NotificationType.Warning]: string;
  [NotificationType.Info]: string;
}

@Injectable()
export class NotificationsService {
  private defaultTitles: NotificationTextMap = {
    [NotificationType.Success]: 'Action was successful',
    [NotificationType.Error]: 'Action did fail',
    [NotificationType.Warning]: 'Warning',
    [NotificationType.Info]: 'Information'
  };

  private defaultIcons: NotificationTextMap = {
    [NotificationType.Success]: 'check_circle',
    [NotificationType.Error]: 'error_outline',
    [NotificationType.Warning]: 'error_outline',
    [NotificationType.Info]: 'info_outline'
  };

  private defaultTimeout = 4000;
  private defaultClosable = true;

  private list$ = new BehaviorSubject<Notification[]>([]);

  constructor(@Optional() @Inject(NotificationOptions) options: NotificationOptions | null) {
    if (!options) {
      throw new Error('No NotificationOptions were received.');
    }
    this.defaultTimeout = options.timeout === undefined ? this.defaultTimeout : options.timeout;
    this.defaultClosable = options.closable === undefined ? this.defaultClosable : options.closable;
    this.defaultTitles = this.mergeText(this.defaultTitles, options.titles);
    this.defaultIcons = this.mergeText(this.defaultIcons, options.icons);
  }

  get items(): BehaviorSubject<Notification[]> {
    return this.list$;
  }

  success(text: string | Translation, timeout = this.defaultTimeout): void {
    this.create({ text, timeout, type: NotificationType.Success });
  }

  error(text: string | Translation, timeout = this.defaultTimeout): void {
    this.create({ text, timeout, type: NotificationType.Error });
  }

  warn(text: string | Translation, timeout = this.defaultTimeout): void {
    this.create({ text, timeout, type: NotificationType.Warning });
  }

  info(text: string | Translation, timeout = this.defaultTimeout): void {
    this.create({ text, timeout, type: NotificationType.Info });
  }

  create(notification: Notification): void {
    const item = this.compose(notification);
    this.push(item);
  }

  delete(notification: Notification): void {
    this.pull(notification);
  }

  private push(notification: Notification): void {
    const list = this.list$.getValue();
    list.push(notification);
    this.list$.next(list);
  }

  private pull(notification: Notification): void {
    const list = this.list$.getValue();
    list.forEach((item, index) => {
      if (item.id === notification.id) {
        list.splice(index, 1);
      }
    });
    this.list$.next(list);
  }

  private compose(notification: Notification): Notification {
    notification.id = Math.random().toString(36).substr(2, 10);
    notification.closable = notification.closable !== undefined ? notification.closable : this.defaultClosable;
    notification.title = notification.title || this.defaultTitles[notification.type];
    notification.icon = notification.icon || this.defaultIcons[notification.type];
    notification.timeout = notification.timeout !== undefined ? notification.timeout : this.defaultTimeout;
    return notification;
  }

  private mergeText(base: NotificationTextMap, extra: NotificationTitleOptions | undefined): NotificationTextMap {
    return {
      [NotificationType.Success]: extra?.success ?? base[NotificationType.Success],
      [NotificationType.Error]: extra?.error ?? base[NotificationType.Error],
      [NotificationType.Warning]: extra?.warning ?? base[NotificationType.Warning],
      [NotificationType.Info]: extra?.info ?? base[NotificationType.Info]
    };
  }
}
