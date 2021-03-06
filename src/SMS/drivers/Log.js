const CatLog = require('cat-log');
const logger = new CatLog('adonis:sms');

class Log {
  constructor (Config) {
    this.config = Config;
  }

  send (message, config) {
    if (config) this.config = config;
    logger.info(`SMS log driver send. from=${message.from} to=${message.to}`);
    logger.info('———————————————————————————————————————————————————————————');
    logger.info(message.text);
    logger.info('———————————————————————————————————————————————————————————');
    return Promise.resolve();
  }
}

module.exports = Log;
