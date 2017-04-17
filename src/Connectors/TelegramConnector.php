<?php namespace Moay\Notify\Connectors;

use Moay\Notify\Interfaces\ConnectorInterface;
use Moay\Notify\Messages\Message;

use Longman\TelegramBot\Exception\TelegramException;
use Longman\TelegramBot\Request;
use Longman\TelegramBot\Telegram;

class TelegramConnector extends Connector implements ConnectorInterface
{
    /**
     * Setup method which is called on construction
     * @return void
     */
    public function setup()
    {
        new Telegram($this->settings->get('notify.telegram.apiKey'), $this->settings->get('notify.telegram.botName'));
    }

    /**
     * Method which actually sends a message to Telegram
     * @param  Message $message
     * @return void
     */
    public function send($message)
    {
        $content = $message->getMessage();

        if ($message->getAuthor() !== null) {
            $content = '@'.$message->getAuthor()->username.' '. $content;
        }

        $content = $this->parseLinksInMessage($content, $message->getLinksToParse());

        $data = $this->createMessagePayload($content);

        Request::sendMessage($data);
    }

    /**
     * Checks wether the Connector works with the current settings
     * @return boolean
     */
    public function works()
    {
        $data = $this->createMessagePayload('Flarum is able to contact this Telegram room. Great!');

        try {
            $result = Request::sendMessage($data);

            return $result->isOk();
        } catch (TelegramException $e) {
            return false;
        }
    }

    /**
     * Parses all links in the message body to make them clickable
     * @param  string $content
     * @param  array $linksToParse  string=>link array
     * @return string               the parsed $content
     */
    protected function parseLinksInMessage($content, $linksToParse)
    {
        foreach ($linksToParse as $search => $link) {
            $content = str_replace($search, '<a href="'.$link.'">'.$search.'</a>', $content);
        }
        return $content;
    }

    /**
     * Creates a payload to be sent using the API.
     * @param string $message
     * @return array
     */
    protected function createMessagePayload($message)
    {
        return [
            'chat_id' => $this->settings->get('notify.telegram.chatId'),
            'text' => $message,
            'parse_mode' => 'HTML',
        ];
    }
}
