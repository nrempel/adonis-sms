const ServiceProvider = require('adonis-fold').ServiceProvider;

class SMSProvider extends ServiceProvider {

  * register () {
    const SMS = require('../src/SMS');
    this.app.singleton('Adonis/Addons/SMS', app => {
      const View = app.use('Adonis/Src/View');
      const Config = app.use('Adonis/Src/Config');
      return new SMS(View, Config);
    });
    this.app.manager('Adonis/Addons/SMS', SMS);
  }

}

module.exports = SMSProvider;
