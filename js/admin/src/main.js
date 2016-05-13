import { extend } from 'flarum/extend';
import addNotifyPane from 'moay/flarum-notify/addNotifyPane';
import app from 'flarum/app';
import saveSettings from 'flarum/utils/saveSettings';

app.initializers.add('flarum-notify', app => {
	addNotifyPane();
});
