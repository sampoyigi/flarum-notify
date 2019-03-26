<?php

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;
use Moay\Notify\Listeners\AdminPayload;
use Moay\Notify\Listeners\RegisterApiRoutes;
use Moay\Notify\Listeners\DiscussionWasDeletedListener;
use Moay\Notify\Listeners\DiscussionWasStartedListener;
use Moay\Notify\Listeners\PostWasDeletedListener;
use Moay\Notify\Listeners\PostWasHiddenListener;
use Moay\Notify\Listeners\PostWasPostedListener;

return [
    function (Dispatcher $events) {
        $events->subscribe(DiscussionWasDeletedListener::class);
        $events->subscribe(DiscussionWasStartedListener::class);

        $events->subscribe(PostWasDeletedListener::class);
        $events->subscribe(PostWasHiddenListener::class);
        $events->subscribe(PostWasPostedListener::class);

        // Add API routes
        $events->subscribe(RegisterApiRoutes::class);
    },
    (new Extend\Frontend('admin'))
        ->css(__DIR__ . '/resources/less/admin/extension.less')
        ->js(__DIR__ . '/js/dist/admin.js')
        ->content(new AdminPayload),
    new Extend\Locales(__DIR__ . '/resources/locale'),
];
