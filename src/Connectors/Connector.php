<?php namespace Moay\Notify\Connectors;

use Flarum\Settings\SettingsRepositoryInterface;

class Connector
{
    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;

        $this->setup();
    }
}
