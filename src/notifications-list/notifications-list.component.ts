import { animate, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Notification } from '../notifications.interface';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'ngx-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
  animations: [
    trigger('notificationListAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(':enter', stagger('500ms', [
          animate('500ms cubic-bezier(0, 0, .2, 1)', keyframes([
            style({ height: 0, opacity: 0, transform: 'translateX({{fromX}})', offset: 0 }),
            style({ height: '*', opacity: 0, transform: 'translateX({{fromX}})', offset: 0.75 }),
            style({ height: '*', opacity: 1, transform: 'translateX({{toX}})', offset: 1.0 })
          ]))
        ]), { optional: true }),
        query(':leave', stagger('500ms', [
          animate('500ms cubic-bezier(0, 0, .2, 1)', keyframes([
            style({ height: '*', opacity: 1, transform: 'translateX({{toX}})', offset: 0 }),
            style({ height: '*', opacity: 0, transform: 'translateX({{fromX}})', offset: 0.9 }),
            style({ height: 0, opacity: 0, transform: 'translateX({{fromX}})', offset: 1.0 })
          ]))
        ]), { optional: true })
      ], { params: { fromX: '50%', toX: '0' } })
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  standalone: false
})
export class NgxNotificationsListComponent implements OnInit {
  @Input() align: string | null = null;
  @Input() maxWidth = '420px';
  @Input() iconClass = 'material-icons';

  notifications$!: Observable<Notification[]>;

  trackById = (_index: number, item: Notification): string => {
    return item.id ?? String(_index);
  };

  @HostBinding('style.justify-content')
  get xAlignment(): string {
    const xDirection = this.alignment.x;
    if (xDirection !== 'left' && xDirection !== 'right') {
      throw new Error(`The [x] can only be 'left' || 'right'.`);
    }
    return xDirection === 'left' ? 'flex-start' : 'flex-end';
  }

  @HostBinding('style.align-items')
  get yAlignment(): string {
    const yDirection = this.alignment.y;
    if (yDirection !== 'top' && yDirection !== 'bottom') {
      throw new Error(`The [y] can only be 'top' || 'bottom'.`);
    }
    return yDirection === 'top' ? 'flex-start' : 'flex-end';
  }

  get params(): { fromX: string; toX: string } {
    return {
      fromX: this.alignment.x === 'left' ? '-50%' : '50%',
      toX: '0'
    };
  }

  get alignment(): { x: string; y: string } {
    if (!this.align) {
      return { x: 'right', y: 'top' };
    }

    const directions = this.align.split(' ');
    if (directions.length !== 2) {
      throw new Error('The align variables must have an [y x] format.');
    }

    return {
      x: (directions[1] ?? '').trim(),
      y: (directions[0] ?? '').trim()
    };
  }

  constructor(private notifications: NotificationsService) {
  }

  ngOnInit(): void {
    this.notifications$ = this.notifications.items;
  }

  onNotificationDestroy(notification: Notification): void {
    this.notifications.delete(notification);
  }
}
