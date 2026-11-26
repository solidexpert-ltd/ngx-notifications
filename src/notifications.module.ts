import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxNotificationsItemComponent } from './notifications-item/notifications-item.component';
import { NgxNotificationsListComponent } from './notifications-list/notifications-list.component';
import { NotificationOptions } from './notifications.interface';
import { NotificationsService } from './notifications.service';
import { NgxNotificationsTranslatePipe } from './translate.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NgxNotificationsListComponent,
    NgxNotificationsItemComponent,
    NgxNotificationsTranslatePipe
  ],
  exports: [NgxNotificationsListComponent]
})
export class NgxNotificationsModule {
  static forRoot(options: NotificationOptions = {}): ModuleWithProviders<NgxNotificationsModule> {
    return {
      ngModule: NgxNotificationsModule,
      providers: [
        NotificationsService,
        { provide: NotificationOptions, useValue: options }
      ]
    };
  }
}
