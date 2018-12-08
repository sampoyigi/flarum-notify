<?php namespace Moay\Notify\Listeners;

use Flarum\Discussion\Event\Started as DiscussionWasStarted;
use Illuminate\Contracts\Events\Dispatcher;
use Moay\Notify\Listeners\NotificationListener;
use Moay\Notify\Messages\DiscussionWasStartedMessage;

class DiscussionWasStartedListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(DiscussionWasStarted::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  DiscussionWasStarted $event
     * @return void
     */
    public function sendMessage(DiscussionWasStarted $event)
    {
        if ($this->shouldTrigger($event)) {
            $message = new DiscussionWasStartedMessage($event->discussion);

            foreach ($this->getConnectorsToNotify() as $connector) {
                $connector->send($message);
            }
        }
    }

    /**
     * Checks wether or not this listener should send a notification for this event
     * @param  DiscussionWasStarted $event
     * @return boolean
     */
    public function shouldTrigger(DiscussionWasStarted $event)
    {
        if ($this->settings->get('flarum-notify.newDiscussionEvent') === '1') {
            return true;
        }
        return false;
    }
}
