<?php namespace Moay\Notify\Api;

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Bus\Dispatcher;
use Moay\Notify\Connectors\GitterConnector;
use Moay\Notify\Connectors\HipChatConnector;
use Moay\Notify\Connectors\SlackConnector;
use Moay\Notify\Connectors\TelegramConnector;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\JsonResponse;

class ConnectorTest implements RequestHandlerInterface
{
    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @var Settings
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     * @param Dispatcher                  $bus
     */
    public function __construct(
        SettingsRepositoryInterface $settings,
        Dispatcher $bus
    ) {
        $this->settings = $settings;
        $this->bus = $bus;
    }

    /**
     * @param ServerRequestInterface $request
     * @return ResponseInterface
     */
    public function handle(ServerRequestInterface $request) : ResponseInterface
    {
        $params = $request->getQueryParams();

        $connector = strtolower($params['connector']);

        switch ($connector) {
            case 'slack':
                if (SlackConnector::isAvailable()) {
                    $slackInstance = new SlackConnector($this->settings);
                    $return = ['success'=> $slackInstance->works()];
                } else {
                    $return = ['success' => false, 'msg' => 'unavailable'];
                }
                break;
            case 'hipchat':
                if (HipChatConnector::isAvailable()) {
                    $hipChatInstance = new HipChatConnector($this->settings);
                    $return = ['success'=> $hipChatInstance->works()];
                } else {
                    $return = ['success' => false, 'msg' => 'unavailable'];
                }
                break;
            case 'gitter':
                if (GitterConnector::isAvailable()) {
                    $gitterInstance = new GitterConnector($this->settings);
                    $return = ['success'=> $gitterInstance->works()];
                } else {
                    $return = ['success' => false, 'msg' => 'unavailable'];
                }
                break;
            case 'telegram':
                if (TelegramConnector::isAvailable()) {
                    $telegramInstance = new TelegramConnector($this->settings);
                    $return = ['success'=> $telegramInstance->works()];
                } else {
                    $return = ['success' => false, 'msg' => 'unavailable'];
                }
                break;
            default:
                $return = ['success'=> false, 'msg'=>'unknown'];
        }

        return new JsonResponse($return);
    }
}
