const Message = require('./message');
const NE = require('node-exceptions');

class SMSManager {

  constructor (view, driver, fromNumber) {
    this.driver = driver;
    this.view = view;
    this.from = fromNumber;
  }

  /**
   * sends sms with given data
   *
   * @method send
   *
   * @param  {String|Array}   view
   * @param  {Object}   data
   * @param  {Function} callback
   * @param  {String} [config]
   * @return {Array}
   *
   * @throws {InvalidArgumentException} If callback is not define or not a function
   *
   * @example
   * sms.send('welcome', {}, function (message) {
   *
   * })
   * sms.send('welcome', {}, function (message) {
   *
   * }, 'alternate.config')
   *
   * @public
   */
  * send (view, data, callback, config) {
    if (typeof (callback) !== 'function') {
      throw new NE.InvalidArgumentException('Callback must be function');
    }
    const message = new Message();
    const compiledView = yield this.view.make(view, data);
    if (this.from) message.from(this.from);
    message.text(compiledView);
    // Call callback to allow setting of params on message
    callback(message);
    return yield this.driver.send(message.data, config);
  }

}

module.exports = SMSManager;
