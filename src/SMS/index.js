const Drivers = require('./drivers');
const Ioc = require('adonis-fold').Ioc;
const NE = require('node-exceptions');
const SMSManager = require('./SMSManager');

const extendedDrivers = {};

/**
 * Singleton
 */
class SMS {

  constructor (View, Config) {
    this.config = Config;
    this.view = View;
    this.driversPool = {};

    /**
     * here we spoof methods on the sms manager, which means
     * if any of these methods are called, we will initiate
     * the smsManager and will execute method on the
     * created instance instead of this class.
     * @type {Array}
     */
    this.methodsToSpoof = ['send'];
    this.methodsToSpoof.forEach((method) => {
      const self = this;
      this[method] = function () {
        const instance = self.driver('default');
        return instance[method].apply(instance, arguments);
      };
    });
  }

  static extend (key, value) {
    extendedDrivers[key] = value;
  }


  makeDriverInstance (driver) {
    if (driver === 'default') {
      driver = this.config.get('sms.driver');
    }
    if (Drivers[driver]) {
      return Ioc.make(Drivers[driver]);
    } else if (extendedDrivers[driver]) {
      return extendedDrivers[driver];
    }
    throw new NE.DomainException(`Unable to locate ${driver} sms driver`);
  }

  /**
   * returns a new connection for a given driver, if connection
   * was created earlier, it will be returned instead of a
   * new connection.
   *
   * @param  {String} driver
   * @return {Object}
   *
   * @example
   * SMS.driver('plivo')
   *
   * @public
   */
  driver (driver) {
    if (!this.driversPool[driver]) {
      const driverInstance = this.makeDriverInstance(driver);
      this.driversPool[driver] = driverInstance;
    }
    return new SMSManager(this.view, this.driversPool[driver], this.config.get('sms.from'));
  }

}

module.exports = SMS;
