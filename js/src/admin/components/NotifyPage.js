import Alert from 'flarum/components/Alert';
import Button from 'flarum/components/Button';
import Component from 'flarum/Component';
import FieldSet from 'flarum/components/FieldSet';
import ItemList from 'flarum/utils/ItemList';
import Page from 'flarum/components/Page';
import Switch from 'flarum/components/Switch';

import GitterSettingsModal from './GitterSettingsModal';
import HipChatSettingsModal from './HipChatSettingsModal';
import saveSettings from 'flarum/utils/saveSettings';
import SlackSettingsModal from './SlackSettingsModal';
import TelegramSettingsModal from './TelegramSettingsModal';
import TestConnectorsModal from './TestConnectorsModal';

export default class NotifyPage extends Page {

  init() {
      super.init();

      /**
       * Indicates if the page is loading.
       *
       * @type {Boolean}
       */
      this.loading = false;

      /**
       * The fields.
       *
       * @type {Array}
       */
      this.fields = [
          'discussionDeletedEvent',
          'gitterEnabled',
          'hipChatEnabled',
          'telegramEnabled',
          'newDiscussionEvent',
          'newPostEvent',
          'postDeletedEvent',
          'postHiddenEvent',
          'slackEnabled',
      ];

      /**
       * The setting prefix.
       *
       * Each setting will be prefixed by this string.
       *
       * @type {String}
       */
      this.settingsPrefix = 'flarum-notify.';

      /**
       * The items.
       * @type {Object}
       */
      this.values = {};

      /**
       *
       */
      this.fields.forEach(
          key => this.values[key] = m.prop(app.data.settings[this.settingsPrefix + key])
      );
  }

  view() {
      return (
        <div className="NotifyPage">
          <div className="NotifyPage-header">
            <div className="container">
              <h2>{app.translator.trans('flarum-notify.admin.title')}</h2>
              <p>{app.translator.trans('flarum-notify.admin.description')}</p>
            </div>
          </div>
          <form className="NotifyPage-body" onsubmit={this.onsubmit.bind(this)}>
            <div className="container">
              <fieldset className="NotifyPage-services">
                <legend>
                  {app.translator.trans('flarum-notify.admin.services.title')}
                </legend>
                <div className="helpText">
                  {app.translator.trans('flarum-notify.admin.services.description')}
                </div>
                <table className="NotifyTable">
                  {this.connectorItems().toArray().map(connector => (
                    <tr>
                      <td>
                        {Switch.component({
                           disabled: !app.data.flarumNotify[connector.name + 'Available'],
                           state: this.values[connector.name + 'Enabled']() || false,
                           children: connector.label,
                           onchange: this.values[connector.name + 'Enabled']
                        })}
                        <p class="unavailable-hint">{app.data.flarumNotify[connector.name + 'Available'] ? null : app.translator.trans('flarum-notify.admin.services.unavailable', {a: <a href="https://github.com/manelizzard/flarum-notify#installation" target="_new" />})}</p>
                      </td>
                      <td>
                        {Button.component({
                          disabled: !app.data.flarumNotify[connector.name + 'Available'],
                          className: 'Button NotifyButton rounded',
                          icon: 'fas fa-cog fa-fw',
                          type: 'button',
                          onclick: () => app.modal.show(new connector.modal())
                        })}
                      </td>
                    </tr>
                  ))}
                </table>
              </fieldset>
              <hr />
              <fieldset className="NotifyPage-events">
                <legend>
                  {app.translator.trans('flarum-notify.admin.events.title')}
                </legend>
                <div class="helpText">
                  {app.translator.trans('flarum-notify.admin.events.description')}
                </div>
                <table className="NotifyTable">
                  {this.eventItems().toArray().map(event => (
                    <tr>
                      <td>
                        {Switch.component({
                          state: this.values[event.name](),
                          children: event.label,
                          onchange: this.values[event.name]
                        })}
                      </td>
                    </tr>
                  ))}
                </table>
              </fieldset>
              <hr />
              {Button.component({
                type: 'submit',
                className: 'Button Button--primary',
                children: 'Save',
                loading: this.loading
               })}
            </div>
          </form>
        </div>
      );
  }

  connectorItems() {
    const items = new ItemList();

    items.add('slack', {
      name: 'slack',
      label: 'Slack',
      modal: SlackSettingsModal,
    });

    items.add('hipChat', {
      name: 'hipChat',
      label: 'HipChat',
      modal: HipChatSettingsModal,
    });

    items.add('gitter', {
      name: 'gitter',
      label: 'Gitter',
      modal: GitterSettingsModal,
    });

    items.add('telegram', {
      name: 'telegram',
      label: 'Telegram',
      modal: TelegramSettingsModal,
    });

    return items;
  }

  eventItems() {
    const items = new ItemList();

    items.add('newDiscussionEvent', {
      name: 'newDiscussionEvent',
      label: app.translator.trans('flarum-notify.admin.events.discussion_started')
    });

    items.add('discussionDeletedEvent', {
      name: 'discussionDeletedEvent',
      label: app.translator.trans('flarum-notify.admin.events.discussion_deleted')
    });

    items.add('newPostEvent', {
      name: 'newPostEvent',
      label: app.translator.trans('flarum-notify.admin.events.post_posted')
    });

    items.add('postDeletedEvent', {
      name: 'postDeletedEvent',
      label: app.translator.trans('flarum-notify.admin.events.post_deleted')
    });

    items.add('postHiddenEvent', {
      name: 'postHiddenEvent',
      label: app.translator.trans('flarum-notify.admin.events.post_hidden')
    });

    return items;
  }

  onsubmit(e) {
      e.preventDefault();

      if (this.loading) return;

      // prevents multiple savings
       this.loading = true;
       app.alerts.dismiss(this.successAlert);

       const settings = {};

       // gets all the values from the form
       this.fields.forEach(
           key => settings[this.settingsPrefix + key] = this.values[key]()
       );

       // actually saves everything in the database
        saveSettings(settings)
        .then(() => {
            app.alerts.show(this.successAlert = new Alert({type: 'success', children: app.translator.trans('core.admin.basics.saved_message')}));
            this.loading = false;
            m.redraw();
        });
  }
}
