<?php namespace Moay\Notify\Messages;

use Moay\Notify\Messages\Message;

class DiscussionWasStartedMessage extends Message
{
    /**
     * @param [type] $discussion
     */
    public function __construct($discussion)
    {
        $this->discussion = $discussion;
        $this->prepareMessage();
    }

    /**
     * Prepares the message which should be sent to the Connectors
     * @return void
     */
    public function prepareMessage()
    {
        $this->author = $this->discussion->startUser;
        $this->message = 'started discussion #' . $this->discussion->id . ' ('.$this->discussion->title.')';
        $this->short = 'New post';
        $this->color = 'green';

        $this->addLinkToParse('@'.$this->author->username, app('flarum.config')['url']."/u/{$this->author->id}");
        $this->addLinkToParse('discussion #'.$this->discussion->id, app('flarum.config')['url']."/d/{$this->discussion->id}");
    }
}
