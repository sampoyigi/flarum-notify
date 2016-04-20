import { extend } from 'flarum/extend';
import app from 'flarum/app';
import saveSettings from 'flarum/utils/saveSettings';

import addNotifyPane from 'moay/flarum-notify/addNotifyPane';

app.initializers.add('flarum-notify', app => {
	addNotifyPane();
});
