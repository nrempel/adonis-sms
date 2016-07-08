const CatLog = require('cat-log');
const logger = new CatLog('adonis:sms');

class Log {

  constructor (Config) {
    this.config = Config;
  }

  send (message, config) {
    if (config) this.config = config;
    if (!message.from) message.from = this.config.from;
    logger.info(`SMS log driver send. from=${message.from} to=${message.to} text=${message.text}`);
    return Promise.resolve();
  }

}

module.exports = Log;
