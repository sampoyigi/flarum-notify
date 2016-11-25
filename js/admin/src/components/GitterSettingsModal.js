import Modal from 'flarum/components/Modal';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';

export default class GitterSettingsModal extends Modal {
  constructor(...args) {
    super(...args);

    this.webhook = m.prop(
        app.data.settings['notify.gitter.webhook'] || ''
    );
  }

  className() {
    return 'GitterSettingsModal Modal--small';
  }

  title() {
    return app.translator.trans('flarum-notify.admin.gitter-modal.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form">
          <div className="Form-group">
            <label>{app.translator.trans('flarum-notify.admin.gitter-modal.webhook')}</label>
            <input className="FormControl" value={this.webhook()} oninput={m.withAttr('value', this.webhook)}/>
          </div>

          <p>{app.translator.trans('flarum-notify.admin.gitter-modal.description', {a: <a href="https://gitter.im" tabindex="-1" target="_new"/>}, {i: <i/>})}</p>

          <hr/>

          <div className="Form-group">
            {Button.component({
              type: 'submit',
              className: 'Button Button--primary GitterSettingsModal-save',
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
      'notify.gitter.webhook': this.webhook()
    }).then(
      () => this.hide(),
      () => {
        this.loading = false;
        m.redraw();
      }
    );
  }
}
