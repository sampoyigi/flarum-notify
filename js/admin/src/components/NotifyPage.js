import Alert from 'flarum/components/Alert';
import Button from 'flarum/components/Button';
import Component from 'flarum/Component';
import FieldSet from 'flarum/components/FieldSet';
import Page from 'flarum/components/Page';
import Switch from 'flarum/components/Switch';

import GitterSettingsModal from 'moay/flarum-notify/components/GitterSettingsModal';
import HipChatSettingsModal from 'moay/flarum-notify/components/HipChatSettingsModal';
import saveSettings from 'flarum/utils/saveSettings';
import SlackSettingsModal from 'moay/flarum-notify/components/SlackSettingsModal';
import TelegramSettingsModal from 'moay/flarum-notify/components/TelegramSettingsModal';
import TestConnectorsModal from 'moay/flarum-notify/components/TestConnectorsModal';

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
                  <tr>
                    <td>
                      {Switch.component({
                         state: this.values.slackEnabled() || false,
                         children: 'Slack',
                         onchange: this.values.slackEnabled
                      })}
                    </td>
                    <td>
                      {Button.component({
                        className: 'Button NotifyButton rounded',
                        icon: 'cog',
                        type: 'button',
                        onclick: () => app.modal.show(new SlackSettingsModal())
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {Switch.component({
                         state: this.values.hipChatEnabled(),
                         children: 'Hipchat',
                         onchange: this.values.hipChatEnabled
                      })}
                    </td>
                    <td>
                      {Button.component({
                        className: 'Button NotifyButton rounded',
                        icon: 'cog',
                        type: 'button',
                        onclick: () => app.modal.show(new HipChatSettingsModal())
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {Switch.component({
                         state: this.values.gitterEnabled(),
                         children: 'Gitter',
                         onchange: this.values.gitterEnabled
                      })}
                    </td>
                    <td>
                      {Button.component({
                        className: 'Button NotifyButton rounded',
                        icon: 'cog',
                        type: 'button',
                        onclick: () => app.modal.show(new GitterSettingsModal())
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {Switch.component({
                         state: this.values.telegramEnabled(),
                         children: 'Telegram',
                         onchange: this.values.telegramEnabled
                      })}
                    </td>
                    <td>
                      {Button.component({
                        className: 'Button NotifyButton rounded',
                        icon: 'cog',
                        type: 'button',
                        onclick: () => app.modal.show(new TelegramSettingsModal())
                      })}
                    </td>
                  </tr>
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
                  <tr>
                    <td>
                      {Switch.component({
                        state: this.values.newDiscussionEvent(),
                        children: app.translator.trans('flarum-notify.admin.events.discussion_started'),
                        onchange: this.values.newDiscussionEvent
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {Switch.component({
                        state: this.values.discussionDeletedEvent(),
                        children: app.translator.trans('flarum-notify.admin.events.discussion_deleted'),
                        onchange: this.values.discussionDeletedEvent
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {Switch.component({
                         state: this.values.newPostEvent(),
                         children: app.translator.trans('flarum-notify.admin.events.post_posted'),
                         onchange: this.values.newPostEvent
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {Switch.component({
                         state: this.values.postDeletedEvent(),
                         children: app.translator.trans('flarum-notify.admin.events.post_deleted'),
                         onchange: this.values.postDeletedEvent
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {Switch.component({
                         state: this.values.postHiddenEvent(),
                         children: app.translator.trans('flarum-notify.admin.events.post_hidden'),
                         onchange: this.values.postHiddenEvent
                      })}
                    </td>
                  </tr>
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
