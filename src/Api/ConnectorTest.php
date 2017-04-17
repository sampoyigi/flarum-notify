<?php namespace Moay\Notify\Api;

use Flarum\Http\Controller\ControllerInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Bus\Dispatcher;
use Moay\Notify\Connectors\GitterConnector;
use Moay\Notify\Connectors\HipChatConnector;
use Moay\Notify\Connectors\SlackConnector;
use Moay\Notify\Connectors\TelegramConnector;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\JsonResponse;

class ConnectorTest implements ControllerInterface
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
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function handle(ServerRequestInterface $request)
    {
        $params = $request->getQueryParams();

        $connector = strtolower($params['connector']);

        switch ($connector) {
            case 'slack':
                $slackInstance = new SlackConnector($this->settings);
                $return = ['success'=> $slackInstance->works()];
                break;
            case 'hipchat':
                $hipChatInstance = new HipChatConnector($this->settings);
                $return = ['success'=> $hipChatInstance->works()];
                break;
            case 'gitter':
                $gitterInstance = new GitterConnector($this->settings);
                $return = ['success'=> $gitterInstance->works()];
                break;
            case 'telegram':
                $telegramInstance = new TelegramConnector($this->settings);
                $return = ['success'=> $telegramInstance->works()];
                break;
            default:
                $return = ['success'=> false, 'msg'=>'unknown'];
        }

        return new JsonResponse($return);
    }
}
