import Alert from 'flarum/components/Alert';
import Button from 'flarum/components/Button';
import Modal from 'flarum/components/Modal';
import saveSettings from 'flarum/utils/saveSettings';

export default class SlackSettingsModal extends Modal {
    constructor(...args) {
        super(...args);

        this.token = m.prop(app.data.settings['notify.slack.token'] || '');
        this.channel = m.prop(app.data.settings['notify.slack.channel'] || '#general');
        this.username = m.prop(app.data.settings['notify.slack.username'] || 'Flarum');
    }

    className() {
        return 'SlackSettingsModal Modal--small';
    }

    title() {
        return app.translator.trans('flarum-notify.admin.slack-modal.title');
    }

    content() {
        return (
          <div className="Modal-body">
            <div className="Form">
              <div className="Form-group">
                <label>{app.translator.trans('flarum-notify.admin.slack-modal.token')}</label>
                <input className="FormControl" value={this.token()} oninput={m.withAttr('value', this.token)}/>
              </div>

              <div className="Form-group">
                <label>{app.translator.trans('flarum-notify.admin.slack-modal.channel')}</label>
                <input className="FormControl" value={this.channel()} oninput={m.withAttr('value', this.channel)}/>
              </div>

              <div className="Form-group">
                <label>{app.translator.trans('flarum-notify.admin.slack-modal.username')}</label>
                <input className="FormControl" value={this.username()} oninput={m.withAttr('value', this.username)}/>
              </div>

              <p>{
                    app.translator.trans('flarum-notify.admin.slack-modal.description',
                    {a: <a href="https://api.slack.com/web" tabindex="-1" target="_new"/>})
                 }</p>

              <hr/>

              <div className="Form-group">
                {Button.component({
                  type: 'submit',
                  className: 'Button Button--primary SlackSettingsModal-save',
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
        app.alerts.dismiss(this.testResultAlert);

        saveSettings({
            'notify.slack.token': this.token(),
            'notify.slack.channel': this.channel(),
            'notify.slack.username': this.username()
        }).then(
            () => this.hide(),
            () => {
                this.loading = false;
                m.redraw();
            }
        );
    }
}
