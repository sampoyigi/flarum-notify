<?php namespace Moay\Notify\Listeners;

use Flarum\Event\PostWasHidden;
use Illuminate\Contracts\Events\Dispatcher;
use Moay\Notify\Listeners\NotificationListener;
use Moay\Notify\Messages\PostWasHiddenMessage;

class PostWasHiddenListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostWasHidden::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  PostWasHidden $event
     * @return void
     */
    public function sendMessage(PostWasHidden $event)
    {
        if ($this->shouldTrigger($event)) {
            $message = new PostWasHiddenMessage($event->post);

            foreach ($this->getConnectorsToNotify() as $connector) {
                $connector->send($message);
            }
        }
    }

    /**
     * Checks wether or not this listener should send a notification for this event
     * @param  PostWasHidden $event
     * @return boolean
     */
    public function shouldTrigger(PostWasHidden $event)
    {
        if ($this->settings->get('flarum-notify.postHiddenEvent') === '1') {
            return true;
        }
        return false;
    }
}
