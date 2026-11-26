import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { Notification, NotificationType } from '../notifications.interface';

@Component({
  selector: 'ngx-notifications-item',
  templateUrl: './notifications-item.component.html',
  styleUrls: ['./notifications-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  standalone: false
})
export class NgxNotificationsItemComponent implements OnInit, OnDestroy {
  @Input() notification!: Notification;
  @Input() iconClass = 'material-icons';

  @Output() onDestroy = new EventEmitter<Notification>();

  private progress = 0;
  private count = 0;
  private steps = 0;
  private speed = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private startTime = 0;
  private difference = 0;

  @HostBinding('class')
  get getClass(): NotificationType {
    return this.notification.type;
  }

  constructor(
    private zone: NgZone,
    private changeDetection: ChangeDetectorRef
  ) {
  }

  get progressWidth(): string {
    return Math.min(this.progress, 100) + '%';
  }

  ngOnInit(): void {
    const timeout = this.notification.timeout;
    if (timeout === undefined || timeout <= 0 || typeof setTimeout === 'undefined') {
      this.notification.closable = true;
      return;
    }
    this.startTimeout(timeout);
  }

  ngOnDestroy(): void {
    const timeout = this.notification.timeout;
    if (timeout === undefined || timeout <= 0 || typeof clearTimeout === 'undefined') {
      return;
    }
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
  }

  private startTimeout(timeout: number): void {
    this.steps = timeout / 10;
    this.speed = timeout / this.steps;
    this.startTime = new Date().getTime();
    this.zone.runOutsideAngular(() => {
      this.timer = setTimeout(this.instance, this.speed);
    });
  }

  private instance = (): void => {
    this.difference = (new Date().getTime() - this.startTime) - (this.count * this.speed);
    if (this.count++ === this.steps) {
      this.onDestroy.emit(this.notification);
    }
    this.progress += 100 / this.steps;
    this.timer = setTimeout(this.instance, this.speed - this.difference);
    this.zone.run(() => this.changeDetection.detectChanges());
  };
}
