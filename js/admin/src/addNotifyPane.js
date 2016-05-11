import { extend } from 'flarum/extend';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import AdminNav from 'flarum/components/AdminNav';
import app from 'flarum/app';
import NotifyPage from 'moay/flarum-notify/components/NotifyPage';

export default function() {
  app.routes.notify = {path: '/notify', component: NotifyPage.component()};

  app.extensionSettings['flarum-notify'] = () => m.route(app.route('notify'));

  extend(AdminNav.prototype, 'items', items => {

    items.add('notify', AdminLinkButton.component({
      href: app.route('notify'),
      icon: 'bell',
      children: app.translator.trans('flarum-notify.admin.title'),
      description: app.translator.trans('flarum-notify.admin.description')
    }));
  });
}
