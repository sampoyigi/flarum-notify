System.register('moay/flarum-notify/addNotifyPane', ['flarum/extend', 'flarum/components/AdminLinkButton', 'flarum/components/AdminNav', 'flarum/app', 'moay/flarum-notify/components/NotifyPage'], function (_export) {
  'use strict';

  var extend, AdminLinkButton, AdminNav, app, NotifyPage;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsAdminLinkButton) {
      AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
    }, function (_flarumComponentsAdminNav) {
      AdminNav = _flarumComponentsAdminNav['default'];
    }, function (_flarumApp) {
      app = _flarumApp['default'];
    }, function (_moayFlarumNotifyComponentsNotifyPage) {
      NotifyPage = _moayFlarumNotifyComponentsNotifyPage['default'];
    }],
    execute: function () {
      _export('default', function () {
        app.routes.notify = { path: '/notify', component: NotifyPage.component() };

        app.extensionSettings['flarum-notify'] = function () {
          return m.route(app.route('notify'));
        };

        extend(AdminNav.prototype, 'items', function (items) {

          items.add('notify', AdminLinkButton.component({
            href: app.route('notify'),
            icon: 'bell',
            children: app.translator.trans('flarum-notify.admin.title'),
            description: app.translator.trans('flarum-notify.admin.description')
          }));
        });
      });
    }
  };
});;
System.register('moay/flarum-notify/components/GitterSettingsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/saveSettings'], function (_export) {
  'use strict';

  var Modal, Button, saveSettings, GitterSettingsModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsSaveSettings) {
      saveSettings = _flarumUtilsSaveSettings['default'];
    }],
    execute: function () {
      GitterSettingsModal = (function (_Modal) {
        babelHelpers.inherits(GitterSettingsModal, _Modal);

        function GitterSettingsModal() {
          babelHelpers.classCallCheck(this, GitterSettingsModal);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          babelHelpers.get(Object.getPrototypeOf(GitterSettingsModal.prototype), 'constructor', this).apply(this, args);

          this.webhook = m.prop(app.data.settings['notify.gitter.webhook'] || '');
        }

        babelHelpers.createClass(GitterSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'GitterSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('flarum-notify.admin.gitter-modal.title');
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('flarum-notify.admin.gitter-modal.webhook')
                  ),
                  m('input', { className: 'FormControl', value: this.webhook(), oninput: m.withAttr('value', this.webhook) })
                ),
                m(
                  'p',
                  null,
                  app.translator.trans('flarum-notify.admin.gitter-modal.description', { a: m('a', { href: 'https://gitter.im', tabindex: '-1', target: '_new' }) }, { i: m('i', null) })
                ),
                m('hr', null),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary GitterSettingsModal-save',
                    loading: this.loading,
                    children: 'Save Changes'
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this = this;

            e.preventDefault();

            this.loading = true;

            saveSettings({
              'notify.gitter.webhook': this.webhook()
            }).then(function () {
              return _this.hide();
            }, function () {
              _this.loading = false;
              m.redraw();
            });
          }
        }]);
        return GitterSettingsModal;
      })(Modal);

      _export('default', GitterSettingsModal);
    }
  };
});;
System.register('moay/flarum-notify/components/HipChatSettingsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/saveSettings', 'flarum/components/Alert'], function (_export) {
  'use strict';

  var Modal, Button, saveSettings, Alert, HipChatSettingsModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsSaveSettings) {
      saveSettings = _flarumUtilsSaveSettings['default'];
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert['default'];
    }],
    execute: function () {
      HipChatSettingsModal = (function (_Modal) {
        babelHelpers.inherits(HipChatSettingsModal, _Modal);

        function HipChatSettingsModal() {
          babelHelpers.classCallCheck(this, HipChatSettingsModal);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          babelHelpers.get(Object.getPrototypeOf(HipChatSettingsModal.prototype), 'constructor', this).apply(this, args);

          this.token = m.prop(app.data.settings['notify.hipchat.token'] || '');
          this.room = m.prop(app.data.settings['notify.hipchat.room'] || '');
        }

        babelHelpers.createClass(HipChatSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'HipChatSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('flarum-notify.admin.hipchat-modal.title');
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('flarum-notify.admin.hipchat-modal.token')
                  ),
                  m('input', { className: 'FormControl', value: this.token(), oninput: m.withAttr('value', this.token) })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('flarum-notify.admin.hipchat-modal.room')
                  ),
                  m('input', { className: 'FormControl', value: this.room(), oninput: m.withAttr('value', this.room) })
                ),
                m(
                  'p',
                  null,
                  app.translator.trans('flarum-notify.admin.hipchat-modal.description')
                ),
                m(
                  'p',
                  null,
                  m(
                    'b',
                    null,
                    app.translator.trans('flarum-notify.admin.hipchat-modal.warning')
                  )
                ),
                m('hr', null),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary HipChatSettingsModal-save',
                    loading: this.loading,
                    children: 'Save Changes'
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this = this;

            e.preventDefault();
            this.loading = true;

            app.alerts.dismiss(this.testResultAlert);
            saveSettings({
              'notify.hipchat.token': this.token(),
              'notify.hipchat.room': this.room()
            }).then(function () {
              return _this.hide();
            }, function () {
              _this.loading = false;
              m.redraw();
            });
          }
        }]);
        return HipChatSettingsModal;
      })(Modal);

      _export('default', HipChatSettingsModal);
    }
  };
});;
System.register('moay/flarum-notify/components/NotifyPage', ['flarum/components/Alert', 'flarum/components/Button', 'flarum/Component', 'flarum/components/FieldSet', 'flarum/components/Page', 'flarum/components/Switch', 'moay/flarum-notify/components/GitterSettingsModal', 'moay/flarum-notify/components/HipChatSettingsModal', 'flarum/utils/saveSettings', 'moay/flarum-notify/components/SlackSettingsModal', 'moay/flarum-notify/components/TelegramSettingsModal', 'moay/flarum-notify/components/TestConnectorsModal'], function (_export) {
  'use strict';

  var Alert, Button, Component, FieldSet, Page, Switch, GitterSettingsModal, HipChatSettingsModal, saveSettings, SlackSettingsModal, TelegramSettingsModal, TestConnectorsModal, NotifyPage;
  return {
    setters: [function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumComponent) {
      Component = _flarumComponent['default'];
    }, function (_flarumComponentsFieldSet) {
      FieldSet = _flarumComponentsFieldSet['default'];
    }, function (_flarumComponentsPage) {
      Page = _flarumComponentsPage['default'];
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch['default'];
    }, function (_moayFlarumNotifyComponentsGitterSettingsModal) {
      GitterSettingsModal = _moayFlarumNotifyComponentsGitterSettingsModal['default'];
    }, function (_moayFlarumNotifyComponentsHipChatSettingsModal) {
      HipChatSettingsModal = _moayFlarumNotifyComponentsHipChatSettingsModal['default'];
    }, function (_flarumUtilsSaveSettings) {
      saveSettings = _flarumUtilsSaveSettings['default'];
    }, function (_moayFlarumNotifyComponentsSlackSettingsModal) {
      SlackSettingsModal = _moayFlarumNotifyComponentsSlackSettingsModal['default'];
    }, function (_moayFlarumNotifyComponentsTelegramSettingsModal) {
      TelegramSettingsModal = _moayFlarumNotifyComponentsTelegramSettingsModal['default'];
    }, function (_moayFlarumNotifyComponentsTestConnectorsModal) {
      TestConnectorsModal = _moayFlarumNotifyComponentsTestConnectorsModal['default'];
    }],
    execute: function () {
      NotifyPage = (function (_Page) {
        babelHelpers.inherits(NotifyPage, _Page);

        function NotifyPage() {
          babelHelpers.classCallCheck(this, NotifyPage);
          babelHelpers.get(Object.getPrototypeOf(NotifyPage.prototype), 'constructor', this).apply(this, arguments);
        }

        babelHelpers.createClass(NotifyPage, [{
          key: 'init',
          value: function init() {
            var _this = this;

            babelHelpers.get(Object.getPrototypeOf(NotifyPage.prototype), 'init', this).call(this);

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
            this.fields = ['discussionDeletedEvent', 'gitterEnabled', 'hipChatEnabled', 'telegramEnabled', 'newDiscussionEvent', 'newPostEvent', 'postDeletedEvent', 'postHiddenEvent', 'slackEnabled'];

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
            this.fields.forEach(function (key) {
              return _this.values[key] = m.prop(app.data.settings[_this.settingsPrefix + key]);
            });
          }
        }, {
          key: 'view',
          value: function view() {
            return m(
              'div',
              { className: 'NotifyPage' },
              m(
                'div',
                { className: 'NotifyPage-header' },
                m(
                  'div',
                  { className: 'container' },
                  m(
                    'h2',
                    null,
                    app.translator.trans('flarum-notify.admin.title')
                  ),
                  m(
                    'p',
                    null,
                    app.translator.trans('flarum-notify.admin.description')
                  )
                )
              ),
              m(
                'form',
                { className: 'NotifyPage-body', onsubmit: this.onsubmit.bind(this) },
                m(
                  'div',
                  { className: 'container' },
                  m(
                    'fieldset',
                    { className: 'NotifyPage-services' },
                    m(
                      'legend',
                      null,
                      app.translator.trans('flarum-notify.admin.services.title')
                    ),
                    m(
                      'div',
                      { className: 'helpText' },
                      app.translator.trans('flarum-notify.admin.services.description')
                    ),
                    m(
                      'table',
                      { className: 'NotifyTable' },
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.values.slackEnabled() || false,
                            children: 'Slack',
                            onchange: this.values.slackEnabled
                          })
                        ),
                        m(
                          'td',
                          null,
                          Button.component({
                            className: 'Button NotifyButton rounded',
                            icon: 'cog',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new SlackSettingsModal());
                            }
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.values.hipChatEnabled(),
                            children: 'Hipchat',
                            onchange: this.values.hipChatEnabled
                          })
                        ),
                        m(
                          'td',
                          null,
                          Button.component({
                            className: 'Button NotifyButton rounded',
                            icon: 'cog',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new HipChatSettingsModal());
                            }
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.values.gitterEnabled(),
                            children: 'Gitter',
                            onchange: this.values.gitterEnabled
                          })
                        ),
                        m(
                          'td',
                          null,
                          Button.component({
                            className: 'Button NotifyButton rounded',
                            icon: 'cog',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new GitterSettingsModal());
                            }
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.values.telegramEnabled(),
                            children: 'Telegram',
                            onchange: this.values.telegramEnabled
                          })
                        ),
                        m(
                          'td',
                          null,
                          Button.component({
                            className: 'Button NotifyButton rounded',
                            icon: 'cog',
                            type: 'button',
                            onclick: function onclick() {
                              return app.modal.show(new TelegramSettingsModal());
                            }
                          })
                        )
                      )
                    )
                  ),
                  m('hr', null),
                  m(
                    'fieldset',
                    { className: 'NotifyPage-events' },
                    m(
                      'legend',
                      null,
                      app.translator.trans('flarum-notify.admin.events.title')
                    ),
                    m(
                      'div',
                      { 'class': 'helpText' },
                      app.translator.trans('flarum-notify.admin.events.description')
                    ),
                    m(
                      'table',
                      { className: 'NotifyTable' },
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.values.newDiscussionEvent(),
                            children: app.translator.trans('flarum-notify.admin.events.discussion_started'),
                            onchange: this.values.newDiscussionEvent
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.values.discussionDeletedEvent(),
                            children: app.translator.trans('flarum-notify.admin.events.discussion_deleted'),
                            onchange: this.values.discussionDeletedEvent
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.values.newPostEvent(),
                            children: app.translator.trans('flarum-notify.admin.events.post_posted'),
                            onchange: this.values.newPostEvent
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.values.postDeletedEvent(),
                            children: app.translator.trans('flarum-notify.admin.events.post_deleted'),
                            onchange: this.values.postDeletedEvent
                          })
                        )
                      ),
                      m(
                        'tr',
                        null,
                        m(
                          'td',
                          null,
                          Switch.component({
                            state: this.values.postHiddenEvent(),
                            children: app.translator.trans('flarum-notify.admin.events.post_hidden'),
                            onchange: this.values.postHiddenEvent
                          })
                        )
                      )
                    )
                  ),
                  m('hr', null),
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary',
                    children: 'Save',
                    loading: this.loading
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this2 = this;

            e.preventDefault();

            if (this.loading) return;

            // prevents multiple savings
            this.loading = true;
            app.alerts.dismiss(this.successAlert);

            var settings = {};

            // gets all the values from the form
            this.fields.forEach(function (key) {
              return settings[_this2.settingsPrefix + key] = _this2.values[key]();
            });

            // actually saves everything in the database
            saveSettings(settings).then(function () {
              app.alerts.show(_this2.successAlert = new Alert({ type: 'success', children: app.translator.trans('core.admin.basics.saved_message') }));
              _this2.loading = false;
              m.redraw();
            });
          }
        }]);
        return NotifyPage;
      })(Page);

      _export('default', NotifyPage);
    }
  };
});;
System.register('moay/flarum-notify/components/SlackSettingsModal', ['flarum/components/Alert', 'flarum/components/Button', 'flarum/components/Modal', 'flarum/utils/saveSettings'], function (_export) {
    'use strict';

    var Alert, Button, Modal, saveSettings, SlackSettingsModal;
    return {
        setters: [function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert['default'];
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton['default'];
        }, function (_flarumComponentsModal) {
            Modal = _flarumComponentsModal['default'];
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings['default'];
        }],
        execute: function () {
            SlackSettingsModal = (function (_Modal) {
                babelHelpers.inherits(SlackSettingsModal, _Modal);

                function SlackSettingsModal() {
                    babelHelpers.classCallCheck(this, SlackSettingsModal);

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    babelHelpers.get(Object.getPrototypeOf(SlackSettingsModal.prototype), 'constructor', this).apply(this, args);

                    this.token = m.prop(app.data.settings['notify.slack.token'] || '');
                    this.channel = m.prop(app.data.settings['notify.slack.channel'] || '#general');
                    this.username = m.prop(app.data.settings['notify.slack.username'] || 'Flarum');
                }

                babelHelpers.createClass(SlackSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'SlackSettingsModal Modal--small';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('flarum-notify.admin.slack-modal.title');
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        return m(
                            'div',
                            { className: 'Modal-body' },
                            m(
                                'div',
                                { className: 'Form' },
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'label',
                                        null,
                                        app.translator.trans('flarum-notify.admin.slack-modal.token')
                                    ),
                                    m('input', { className: 'FormControl', value: this.token(), oninput: m.withAttr('value', this.token) })
                                ),
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'label',
                                        null,
                                        app.translator.trans('flarum-notify.admin.slack-modal.channel')
                                    ),
                                    m('input', { className: 'FormControl', value: this.channel(), oninput: m.withAttr('value', this.channel) })
                                ),
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    m(
                                        'label',
                                        null,
                                        app.translator.trans('flarum-notify.admin.slack-modal.username')
                                    ),
                                    m('input', { className: 'FormControl', value: this.username(), oninput: m.withAttr('value', this.username) })
                                ),
                                m(
                                    'p',
                                    null,
                                    app.translator.trans('flarum-notify.admin.slack-modal.description', { a: m('a', { href: 'https://api.slack.com/web', tabindex: '-1', target: '_new' }) })
                                ),
                                m('hr', null),
                                m(
                                    'div',
                                    { className: 'Form-group' },
                                    Button.component({
                                        type: 'submit',
                                        className: 'Button Button--primary SlackSettingsModal-save',
                                        loading: this.loading,
                                        children: 'Save Changes'
                                    })
                                )
                            )
                        );
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit(e) {
                        var _this = this;

                        e.preventDefault();

                        this.loading = true;
                        app.alerts.dismiss(this.testResultAlert);

                        saveSettings({
                            'notify.slack.token': this.token(),
                            'notify.slack.channel': this.channel(),
                            'notify.slack.username': this.username()
                        }).then(function () {
                            return _this.hide();
                        }, function () {
                            _this.loading = false;
                            m.redraw();
                        });
                    }
                }]);
                return SlackSettingsModal;
            })(Modal);

            _export('default', SlackSettingsModal);
        }
    };
});;
System.register('moay/flarum-notify/components/TelegramSettingsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/utils/saveSettings'], function (_export) {
  'use strict';

  var Modal, Button, saveSettings, TelegramSettingsModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumUtilsSaveSettings) {
      saveSettings = _flarumUtilsSaveSettings['default'];
    }],
    execute: function () {
      TelegramSettingsModal = (function (_Modal) {
        babelHelpers.inherits(TelegramSettingsModal, _Modal);

        function TelegramSettingsModal() {
          babelHelpers.classCallCheck(this, TelegramSettingsModal);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          babelHelpers.get(Object.getPrototypeOf(TelegramSettingsModal.prototype), 'constructor', this).apply(this, args);

          this.apiKey = m.prop(app.data.settings['notify.telegram.apiKey'] || '');

          this.botName = m.prop(app.data.settings['notify.telegram.botName'] || '');

          this.chatId = m.prop(app.data.settings['notify.telegram.chatId'] || '');
        }

        babelHelpers.createClass(TelegramSettingsModal, [{
          key: 'className',
          value: function className() {
            return 'TelegramSettingsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('flarum-notify.admin.telegram-modal.title');
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('flarum-notify.admin.telegram-modal.apiKey')
                  ),
                  m('input', { className: 'FormControl', value: this.apiKey(), oninput: m.withAttr('value', this.apiKey) })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('flarum-notify.admin.telegram-modal.botName')
                  ),
                  m('input', { className: 'FormControl', value: this.botName(), oninput: m.withAttr('value', this.botName) })
                ),
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('flarum-notify.admin.telegram-modal.chatId')
                  ),
                  m('input', { className: 'FormControl', value: this.chatId(), oninput: m.withAttr('value', this.chatId) })
                ),
                m(
                  'p',
                  null,
                  app.translator.trans('flarum-notify.admin.telegram-modal.description', { 'aBot': m('a', { href: 'https://github.com/php-telegram-bot/core/blob/master/README.md#create-your-first-bot', tabindex: '-1', target: '_new' }), 'aChatId': m('a', { href: 'http://stackoverflow.com/a/38388851/160386', tabindex: '-1', target: '_new' }) })
                ),
                m('hr', null),
                m(
                  'div',
                  { className: 'Form-group' },
                  Button.component({
                    type: 'submit',
                    className: 'Button Button--primary TelegramSettingsModal-save',
                    loading: this.loading,
                    children: 'Save Changes'
                  })
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            var _this = this;

            e.preventDefault();

            this.loading = true;

            saveSettings({
              'notify.telegram.apiKey': this.apiKey(),
              'notify.telegram.botName': this.botName(),
              'notify.telegram.chatId': this.chatId()
            }).then(function () {
              return _this.hide();
            }, function () {
              _this.loading = false;
              m.redraw();
            });
          }
        }]);
        return TelegramSettingsModal;
      })(Modal);

      _export('default', TelegramSettingsModal);
    }
  };
});;
System.register('moay/flarum-notify/components/TestConnectorsModal', ['flarum/components/Modal', 'flarum/components/Button', 'flarum/lib/components/LoadingIndicator'], function (_export) {
  'use strict';

  var Modal, Button, LoadingIndicator, TestConnectorsModal;
  return {
    setters: [function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal['default'];
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton['default'];
    }, function (_flarumLibComponentsLoadingIndicator) {
      LoadingIndicator = _flarumLibComponentsLoadingIndicator['default'];
    }],
    execute: function () {
      TestConnectorsModal = (function (_Modal) {
        babelHelpers.inherits(TestConnectorsModal, _Modal);

        function TestConnectorsModal() {
          babelHelpers.classCallCheck(this, TestConnectorsModal);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          babelHelpers.get(Object.getPrototypeOf(TestConnectorsModal.prototype), 'constructor', this).apply(this, args);

          this.slack = {};
          this.slack.token = m.prop(app.data.settings['notify.slack.token'] || '');
          this.slack.channel = m.prop(app.data.settings['notify.slack.channel'] || '');

          this.hipchat = {};
          this.hipchat.token = m.prop(app.data.settings['notify.hipchat.token'] || '');
          this.hipchat.room = m.prop(app.data.settings['notify.hipchat.room'] || '');

          this.gitter = {};
          this.gitter.webhook = m.prop(app.data.settings['notify.gitter.webhook'] || '');

          this.telegram = {};
          this.telegram.apiKey = m.prop(app.data.settings['notify.telegram.apiKey'] || '');
          this.telegram.botName = m.prop(app.data.settings['notify.telegram.botName'] || '');
          this.telegram.chatId = m.prop(app.data.settings['notify.telegram.chatId'] || '');

          this.testStatus = m.prop('Preparing...');

          this.runConnectorTest();
        }

        babelHelpers.createClass(TestConnectorsModal, [{
          key: 'className',
          value: function className() {
            return 'TestConnectorsModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return 'Testing your settings';
          }
        }, {
          key: 'content',
          value: function content() {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'statusMessage' },
                this.testStatus()
              )
            );
          }
        }, {
          key: 'runConnectorTest',
          value: function runConnectorTest() {
            switch (this.props.connector) {
              case 'slack':
                this.runSlackTest();
                break;
              case 'hipchat':
                this.runHipChatTest();
                break;
              case 'gitter':
                this.runGitterTest();
                break;
              case 'telegram':
                this.runTelegramTest();
                break;
            }
          }
        }, {
          key: 'runSlackTest',
          value: function runSlackTest() {
            var _this = this;

            if (this.slack.token() === '' || this.slack.channel() === '') {
              this.testStatus('Please fill in token and channel first.');
            } else {
              this.testStatus('Testing...');
              m.request({ method: "GET", url: "/api/notify/test/slack" }).then(function (response) {
                if (response.success === true) {
                  _this.testStatus('Your Slack token seems to work fine. Make sure to provide an existing channel.');
                } else {
                  _this.testStatus('Your Slack token is invalid.');
                }
              });
            }
          }
        }, {
          key: 'runHipChatTest',
          value: function runHipChatTest() {
            var _this2 = this;

            if (this.hipchat.token() === '' || this.hipchat.room() === '') {
              this.testStatus('Please fill in token and room first.');
            } else {
              this.testStatus('Testing...');
              m.request({ method: "GET", url: "/api/notify/test/hipchat" }).then(function (response) {
                if (response.success === true) {
                  _this2.testStatus('Hipchat notifications should work. A test message has been posted to your room.');
                } else {
                  _this2.testStatus('Your token is invalid or the token cannot access your room.');
                }
              });
            }
          }
        }, {
          key: 'runGitterTest',
          value: function runGitterTest() {
            var _this3 = this;

            if (this.gitter.webhook() === '') {
              this.testStatus('Please fill in your webhook first.');
            } else {
              this.testStatus('Testing...');
              m.request({ method: "GET", url: "/api/notify/test/gitter" }).then(function (response) {
                if (response.success === true) {
                  _this3.testStatus('Gitter notifications should work. A test message has been posted to your room.');
                } else {
                  _this3.testStatus('Your webhook is invalid or Gitter could not be reached.');
                }
              });
            }
          }
        }, {
          key: 'runTelegramTest',
          value: function runTelegramTest() {
            var _this4 = this;

            if (this.telegram.apiKey() === '' || this.telegram.botName() === '' || this.telegram.chatId() === '') {
              this.testStatus('Please fill in your API key, bot name and chat ID first.');
            } else {
              this.testStatus('Testing...');
              m.request({ method: "GET", url: "/api/notify/test/telegram" }).then(function (response) {
                if (response.success === true) {
                  _this4.testStatus('Telegram notifications should work. A test message has been posted to your room.');
                } else {
                  _this4.testStatus('Your credentials are invalid or Telegram could not be reached.');
                }
              });
            }
          }
        }]);
        return TestConnectorsModal;
      })(Modal);

      _export('default', TestConnectorsModal);
    }
  };
});;
System.register('moay/flarum-notify/main', ['flarum/extend', 'moay/flarum-notify/addNotifyPane', 'flarum/app', 'flarum/utils/saveSettings'], function (_export) {
	'use strict';

	var extend, addNotifyPane, app, saveSettings;
	return {
		setters: [function (_flarumExtend) {
			extend = _flarumExtend.extend;
		}, function (_moayFlarumNotifyAddNotifyPane) {
			addNotifyPane = _moayFlarumNotifyAddNotifyPane['default'];
		}, function (_flarumApp) {
			app = _flarumApp['default'];
		}, function (_flarumUtilsSaveSettings) {
			saveSettings = _flarumUtilsSaveSettings['default'];
		}],
		execute: function () {

			app.initializers.add('flarum-notify', function (app) {
				addNotifyPane();
			});
		}
	};
});