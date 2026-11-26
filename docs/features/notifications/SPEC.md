# Notifications

## Behavior

- `NgxNotificationsModule.forRoot(options?)` provides one `NotificationsService` and the `NotificationOptions` token.
- `success`, `error`, `warn`, and `info` append a toast. `create` accepts a full `Notification`. `delete` removes a toast by `id`.
- `items` is the `BehaviorSubject` of the current list.
- Default timeout is 4000 ms and toasts are closable. `forRoot` can override timeout, closable, titles, and icons.
- `<ngx-notifications-list>` renders the list. `align` is `[y x]` (`top`/`bottom` and `left`/`right`), defaulting to top right. `maxWidth` defaults to `420px`. `iconClass` defaults to `material-icons`.
- Each toast shows an icon, a title, text, an optional close control, and a progress bar while `timeout` is greater than 0.
- Text may be a string or a `Translation` (`{ token, data }`). `${name}` placeholders support `uppercase`, `lowercase`, `ucfirst`, and `keep`.
- Enter and leave animations slide from the horizontal edge. The host application provides Angular animations and loads `zone.js`.

## Errors / empty

- Importing the module without `forRoot()` does not provide `NotificationsService`.
- `forRoot` with missing options throws `No NotificationOptions were received.`
- `align` must be two words. The horizontal word must be `left` or `right`. The vertical word must be `top` or `bottom`.
- An empty list renders no toast rows.

## Out of scope

- Dictionary lookup from `@stanvanheumen/ngx-translations`.
- Zoneless change detection.
- A demo application in this repository.
