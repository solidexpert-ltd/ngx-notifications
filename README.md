# @solidexpert/ngx-notifications

A simple library that shows toast notifications in an Angular app.

Original library: [stanvanheumen/ngx-notifications](https://github.com/stanvanheumen/ngx-notifications). Copyright (c) 2018 Stan van Heumen.

Maintained by [solidexpert-ltd](https://github.com/solidexpert-ltd).

This package is built with Angular 22.3.0 and ng-packagr. The host application must load `zone.js`. Zoneless bootstrap is not supported, because notification timers run through `NgZone`.

## Installation

```bash
npm install @solidexpert/ngx-notifications
```

Peer dependencies: Angular `>=22` (`@angular/core`, `@angular/common`, `@angular/animations`) and `rxjs` `^7.8.2`.

Add the icon and font styles used by the default layout:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">
```

## Setup

Import `NgxNotificationsModule` and call `forRoot()` so `NotificationsService` is a singleton. Provide animations in the host app.

```typescript
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNotificationsModule } from '@solidexpert/ngx-notifications';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxNotificationsModule.forRoot()
  ]
})
export class AppModule {}
```

Place `<ngx-notifications-list>` where the toasts should appear, then call the service:

```typescript
import { NotificationsService } from '@solidexpert/ngx-notifications';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<ngx-notifications-list></ngx-notifications-list>`
})
export class AppComponent implements OnInit {
  constructor(private notifications: NotificationsService) {}

  ngOnInit(): void {
    this.notifications.success('Something went really good!');
    this.notifications.error('Something went really bad!');
    this.notifications.warn('I want to warn you about something!');
    this.notifications.info('Just some relevant information.');
  }
}
```

`NgxNotificationsListComponent` inputs:

| Input | Default | Description |
| --- | --- | --- |
| `align` | `top right` | `[y x]`, where `y` is `top` or `bottom` and `x` is `left` or `right` |
| `maxWidth` | `420px` | Maximum width of the list |
| `iconClass` | `material-icons` | CSS class applied to the icon |

## Notification

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `string \| Translation` | no | Title. Default depends on the type. |
| `text` | `string \| Translation` | yes | Body text. |
| `type` | `NotificationType` | yes | `Success`, `Error`, `Warning`, or `Info`. |
| `timeout` | `number` | no | Time on screen in milliseconds. Default `4000`. Use `0` to keep it open. |
| `closable` | `boolean` | no | Shows a close control. Default `true`. |
| `icon` | `string` | no | Icon name. Default depends on the type. |

`forRoot()` accepts `NotificationOptions`: `timeout`, `closable`, `titles`, and `icons`.

## Text and placeholders

`success`, `error`, `warn`, `info`, and `create` accept a string or a `Translation`:

```typescript
this.notifications.create({
  text: { token: 'My ${type} message.', data: { type: 'Cool' } },
  type: NotificationType.Success,
  closable: false
});
```

Supported markers are `${name}`, `${name|uppercase}`, `${name|lowercase}`, `${name|ucfirst}`, and `${name|keep}`.

The Angular 5 package `@stanvanheumen/ngx-translations` is not a dependency of this port. Dictionary lookup from that package is not included. Pass an already written string, or a `Translation` token with placeholder data.

## Public API

- `NgxNotificationsModule.forRoot(options?)`
- `NotificationsService` (`items`, `success`, `error`, `warn`, `info`, `create`, `delete`)
- `NgxNotificationsListComponent`
- `Notification`, `NotificationType`, `NotificationOptions`, `Translation`, `TranslationExtras`
