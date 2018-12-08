<?php namespace moay\Notify\Listeners;

use Flarum\Post\Event\Posted as PostWasPosted;
use Illuminate\Contracts\Events\Dispatcher;
use Moay\Notify\Listeners\NotificationListener;
use Moay\Notify\Messages\PostWasPostedMessage;

class PostWasPostedListener extends NotificationListener
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(PostWasPosted::class, [$this, 'sendMessage']);
    }

    /**
     * Sends a message via all of the enable connectors
     * @param  PostWasPosted $event
     * @return void
     */
    public function sendMessage(PostWasPosted $event)
    {
        if ($this->shouldTrigger($event)) {
            $message = new PostWasPostedMessage($event->post);

            foreach ($this->getConnectorsToNotify() as $connector) {
                $connector->send($message);
            }
        }
    }

    /**
     * Checks wether or not this listener should send a notification for this event
     * @param  PostWasPosted $event
     * @return boolean
     */
    public function shouldTrigger(PostWasPosted $event)
    {
        if ($this->settings->get('flarum-notify.newPostEvent') === '1'
            && $event->post->discussion->posts()->count() > 1) {
            return true;
        }
        return false;
    }
}
