<?php namespace Moay\Notify\Listeners;

use Flarum\Event\ConfigureApiRoutes;
use Moay\Notify\Api\ConnectorTest;

class RegisterApiRoutes
{
    public function subscribe($events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'addRoutes']);
    }

    /**
     * Registeres the api routes for the extension
     * @param ConfigureApiRoutes $event
     */
    public function addRoutes(ConfigureApiRoutes $event)
    {
        $event->get(
            '/notify/test/{connector}',
            'notify.test',
            ConnectorTest::class
        );
    }
}
