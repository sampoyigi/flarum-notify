import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';

export default class TelegramSettingsModal extends Modal {
  constructor(...args) {
    super(...args);

    this.apiKey = m.prop(
        app.data.settings['notify.telegram.apiKey'] || ''
    );

    this.botName = m.prop(
        app.data.settings['notify.telegram.botName'] || ''
    );

    this.chatId = m.prop(
        app.data.settings['notify.telegram.chatId'] || ''
    );
  }

  className() {
    return 'TelegramSettingsModal Modal--small';
  }

  title() {
    return app.translator.trans('flarum-notify.admin.telegram-modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('flarum-notify.admin.telegram-modal.apiKey')}</label>
            <input className="FormControl" value={this.apiKey()} oninput={m.withAttr('value', this.apiKey)}/>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('flarum-notify.admin.telegram-modal.botName')}</label>
            <input className="FormControl" value={this.botName()} oninput={m.withAttr('value', this.botName)}/>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('flarum-notify.admin.telegram-modal.chatId')}</label>
            <input className="FormControl" value={this.chatId()} oninput={m.withAttr('value', this.chatId)}/>
          </div>

          <p>{app.translator.trans('flarum-notify.admin.telegram-modal.description', {'aBot': <a href="https://github.com/php-telegram-bot/core/blob/master/README.md#create-your-first-bot" tabindex="-1" target="_new"/>, 'aChatId': <a href="http://stackoverflow.com/a/38388851/160386" tabindex="-1" target="_new"/>})}</p>

          <hr/>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary TelegramSettingsModal-save',
              loading: this.loading,
              children: 'Save Changes'
            })}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    this.loading = true;

    saveSettings({
      'notify.telegram.apiKey': this.apiKey(),
      'notify.telegram.botName': this.botName(),
      'notify.telegram.chatId': this.chatId()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
