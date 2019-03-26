import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import Alert from 'flarum/components/Alert';

export default class HipChatSettingsModal extends Modal {
  constructor(...args) {
    super(...args);

    this.token = m.prop(app.data.settings['notify.hipchat.token'] || '');
    this.room = m.prop(app.data.settings['notify.hipchat.room'] || '');
  }

  className() {
    return 'HipChatSettingsModal Modal--small';
  }

  title() {
    return app.translator.trans('flarum-notify.admin.hipchat-modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('flarum-notify.admin.hipchat-modal.token')}</label>
            <input className="FormControl" value={this.token()} oninput={m.withAttr('value', this.token)}/>
          </div>

          <div className="Form-group">
            <label>{app.translator.trans('flarum-notify.admin.hipchat-modal.room')}</label>
            <input className="FormControl" value={this.room()} oninput={m.withAttr('value', this.room)}/>
          </div>

          <p>{app.translator.trans('flarum-notify.admin.hipchat-modal.description')}</p>
          <p><b>{app.translator.trans('flarum-notify.admin.hipchat-modal.warning')}</b></p>

          <hr/>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary HipChatSettingsModal-save',
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
      'notify.hipchat.token': this.token(),
      'notify.hipchat.room': this.room()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
