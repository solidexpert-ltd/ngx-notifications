# @solidexpert/ngx-notifications

Toast notifications for Angular applications. The package is `@solidexpert/ngx-notifications` on npm. Source is maintained by solidexpert-ltd at `https://github.com/solidexpert-ltd/ngx-notifications`.

The library started as [stanvanheumen/ngx-notifications](https://github.com/stanvanheumen/ngx-notifications) (Copyright (c) 2018 Stan van Heumen).

Non-goals:

- This repository does not ship an application or a Docker image.
- Zoneless Angular bootstrap is not supported. The host app loads `zone.js`.
- Dictionary translations from `@stanvanheumen/ngx-translations` are not bundled. Callers pass strings or `{ token, data }` placeholders.
