<?php namespace Moay\Notify\Listeners;

use Flarum\Settings\SettingsRepositoryInterface;
use Moay\Notify\Connectors\SlackConnector;
use Moay\Notify\Connectors\HipChatConnector;
use Moay\Notify\Connectors\GitterConnector;

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
        if ($this->settings->get('notify.services.hipchat') &&
            $this->settings->get('notify.hipchat.token') &&
            $this->settings->get('notify.hipchat.room')
        ) {
            $connectors[] = new HipChatConnector($this->settings);
        }

        // Check for Gitter
        if ($this->settings->get('notify.services.gitter') &&
            $this->settings->get('notify.gitter.webhook')
        ) {
            $connectors[] = new GitterConnector($this->settings);
        }

        return $connectors;
    }
}
