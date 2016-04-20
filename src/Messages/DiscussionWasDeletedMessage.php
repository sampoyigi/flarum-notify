<?php namespace Moay\Notify\Messages;

use Moay\Notify\Messages\Message;

class DiscussionWasDeletedMessage extends Message
{
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
        $this->title = 'Discussion deleted';
        $this->message = 'Discussion #' . $this->discussion->id . ' ('.$this->discussion->title.') has been deleted';
        $this->short = 'Discussion deleted';
        $this->color = 'red';
    }
}
