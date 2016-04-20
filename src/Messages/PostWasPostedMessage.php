<?php namespace Moay\Notify\Messages;

use Moay\Notify\Messages\Message;

class PostWasPostedMessage extends Message
{
    public function __construct($post)
    {
        $this->post = $post;
        $this->prepareMessage();
    }

    /**
     * Prepares the message which should be sent to the Connectors
     * @return void
     */
    public function prepareMessage()
    {
        $this->author = $this->post->user;
        $this->message = 'added a new post to discussion #' . $this->post->discussion->id . ' ('.$this->post->discussion->title.')';
        $this->short = 'New post';

        $this->addLinkToParse('@'.$this->author->username, app('flarum.config')['url']."/u/{$this->author->id}");
        $this->addLinkToParse('discussion #'.$this->post->discussion->id, app('flarum.config')['url']."/d/{$this->post->discussion->id}");
    }
}
