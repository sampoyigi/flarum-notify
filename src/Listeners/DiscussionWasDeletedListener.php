<?php namespace Moay\Notify\Listeners;

use Flarum\Discussion\Event\Deleted as DiscussionWasDeleted;
use Illuminate\Contracts\Events\Dispatcher;
use Moay\Notify\Listeners\NotificationListener;
use Moay\Notify\Messages\DiscussionWasDeletedMessage;

class DiscussionWasDeletedListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(DiscussionWasDeleted::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  DiscussionWasDeleted $event
     * @return void
     */
    public function sendMessage(DiscussionWasDeleted $event)
    {
        if ($this->shouldTrigger($event)) {
            $message = new DiscussionWasDeletedMessage($event->discussion);

            foreach ($this->getConnectorsToNotify() as $connector) {
                $connector->send($message);
            }
        }
    }

    /**
     * Checks wether or not this listener should send a notification for this event
     * @param  DiscussionWasDeleted $event
     * @return boolean
     */
    public function shouldTrigger(DiscussionWasDeleted $event)
    {
        if ($this->settings->get('flarum-notify.discussionDeletedEvent') === '1') {
            return true;
        }
        return false;
    }
}
