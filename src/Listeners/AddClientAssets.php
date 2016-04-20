<?php namespace Moay\Notify\Listeners;

use DirectoryIterator;
use Flarum\Event\ConfigureClientView;
use Flarum\Event\ConfigureLocales;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    /**
    * Subscribes to the Flarum events.
    *
    * @param Dispatcher $events
    */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureClientView::class, [$this, 'addAdminAssets']);
        $events->listen(ConfigureLocales::class, [$this, 'addLocales']);
    }

    /**
    * Modifies the client view for the Admin.
    *
    * @param ConfigureClientView $event
    */
    public function addAdminAssets(ConfigureClientView $event)
    {
        if ($event->isAdmin()) {
            $event->addAssets([
                __DIR__ . '/../../less/admin/extension.less',
                __DIR__ . '/../../js/admin/dist/extension.js'
            ]);
            $event->addBootstrapper('moay/flarum-notify/main');
        }
    }

    /**
    * Provides i18n files.
    *
    * @param ConfigureLocales $event
    */
    public function addLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'])) {
                $event->locales->addTranslations($file->getBasename('.'.$file->getExtension()), $file->getPathname());
            }
        }
    }
}
