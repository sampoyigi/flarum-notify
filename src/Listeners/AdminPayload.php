<?php

namespace Moay\Notify\Listeners;

use Flarum\Frontend\Document;
use Moay\Notify\Connectors\SlackConnector;
use Moay\Notify\Connectors\HipChatConnector;
use Moay\Notify\Connectors\GitterConnector;
use Moay\Notify\Connectors\TelegramConnector;

class AdminPayload
{
    public function __invoke(Document $document)
    {
        $document->payload['flarumNotify'] = [
            'slackAvailable' => SlackConnector::isAvailable(),
            'hipChatAvailable' => HipChatConnector::isAvailable(),
            'gitterAvailable' => GitterConnector::isAvailable(),
            'telegramAvailable' => TelegramConnector::isAvailable(),
        ];
    }
}
