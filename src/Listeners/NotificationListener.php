<?php namespace Moay\Notify\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Moay\Notify\Connectors\SlackConnector;
use Moay\Notify\Connectors\HipChatConnector;
use Moay\Notify\Connectors\GitterConnector;
use Moay\Notify\Connectors\TelegramConnector;

class NotificationListener
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * Returns all connectors that need to be notified
     * @return array  The connectors
     */
    protected function getConnectorsToNotify()
    {
        $connectors = [];

        // Check for slack
        if ($this->settings->get('flarum-notify.slackEnabled') &&
            $this->settings->get('notify.slack.token') &&
            $this->settings->get('notify.slack.channel')
        ) {
            $connectors[] = new SlackConnector($this->settings);
        }

        // Check for HipChat
        if ($this->settings->get('flarum-notify.hipChatEnabled') &&
            $this->settings->get('notify.hipchat.token') &&
            $this->settings->get('notify.hipchat.room')
        ) {
            $connectors[] = new HipChatConnector($this->settings);
        }

        // Check for Gitter
        if ($this->settings->get('flarum-notify.gitterEnabled') &&
            $this->settings->get('notify.gitter.webhook')
        ) {
            $connectors[] = new GitterConnector($this->settings);
        }

        // Check for Telegram
        if ($this->settings->get('flarum-notify.telegramEnabled') &&
            $this->settings->get('notify.telegram.apiKey') &&
            $this->settings->get('notify.telegram.botName') &&
            $this->settings->get('notify.telegram.chatId')
        ) {
            $connectors[] = new TelegramConnector($this->settings);
        }

        return $connectors;
    }
}
