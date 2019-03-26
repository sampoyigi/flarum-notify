import { extend } from 'flarum/extend';
import addNotifyPane from './addNotifyPane';
import app from 'flarum/app';
import saveSettings from 'flarum/utils/saveSettings';

export { default as NotifyPage } from './components/NotifyPage';

app.initializers.add('manelizzard-notify', app => {
	addNotifyPane();
});
