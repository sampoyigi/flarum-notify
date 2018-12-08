<?php namespace Moay\Notify\Listeners;

use Flarum\Post\Event\Deleted as PostWasDeleted;
use Illuminate\Contracts\Events\Dispatcher;
use Moay\Notify\Listeners\NotificationListener;
use Moay\Notify\Messages\PostWasDeletedMessage;

class PostWasDeletedListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostWasDeleted::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  PostWasDeleted $event
     * @return void
     */
    public function sendMessage(PostWasDeleted $event)
    {
        if ($this->shouldTrigger($event)) {
            $message = new PostWasDeletedMessage($event->post);

            foreach ($this->getConnectorsToNotify() as $connector) {
                $connector->send($message);
            }
        }
    }

    /**
     * Checks wether or not this listener should send a notification for this event
     * @param  PostWasDeleted $event
     * @return boolean
     */
    public function shouldTrigger(PostWasDeleted $event)
    {
        if ($this->settings->get('flarum-notify.postDeletedEvent') === '1'
            && $event->post->discussion
            && $event->post->discussion->posts()->count() != 0) {
            return true;
        }
        return false;
    }
}
