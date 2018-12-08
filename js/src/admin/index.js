import { extend } from 'flarum/extend';
import addNotifyPane from './addNotifyPane';
import app from 'flarum/app';
import saveSettings from 'flarum/utils/saveSettings';

app.initializers.add('flarum-notify', app => {
	addNotifyPane();
});
