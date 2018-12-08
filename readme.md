# Notify

Simple notifications for Flarum. Get notified about forum activities via Slack, HipChat, Gitter or Telegram.

![admin](https://cloud.githubusercontent.com/assets/895589/20643049/6274e43e-b41e-11e6-9f71-a9ef9ed81375.png)

# Installation

Use composer to install the Notify extension:

```bash
composer require manelizzard/flarum-ext-notify
```

then also install the libraries you wants to support:

```bash
composer require cleentfaar/slack '^0.17' # for Slack
composer require gorkalaucirica/hipchat-v2-api-client '^1' # for HipChat
composer require guzzlehttp/guzzle '^6.1' # for Gitter
composer require longman/telegram-bot '^0.41.0' # for Telegram
```
