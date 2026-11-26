# Notifications

**Purpose:** Show success, error, warning, and info toasts from a singleton service.
**Actors:** Host Angular application.

## Code

- `src/notifications.module.ts` — `NgxNotificationsModule.forRoot()`
- `src/notifications.service.ts` — `NotificationsService`
- `src/notifications.interface.ts` — `Notification`, `NotificationType`, `NotificationOptions`, `Translation`
- `src/notifications-list/notifications-list.component.ts` — `<ngx-notifications-list>`
- `src/notifications-item/notifications-item.component.ts` — toast row (not a public export)
- `src/public-api.ts` — package entry

## API

There is no HTTP API. The public TypeScript surface is the module, service, list component, and notification types.

## Spec

Current behavior: [SPEC.md](SPEC.md)
