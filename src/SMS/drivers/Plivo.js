const plivo = require('plivo');

class Plivo {
  constructor (Config) {
    this.config = Config;
    const authId = this.config.get('sms.plivo.authId');
    const authToken = this.config.get('sms.plivo.authToken');
    if (!authId) throw new Error('Auth Id not found in Plivo config.');
    if (!authToken) throw new Error('Auth Token not found in Plivo config.');
    this.plivo = plivo.RestAPI({ authId, authToken });
  }

  send (message, config) {
    if (config) this.config = config;
    return new Promise((resolve, reject) => {
      this.plivo.send_message({
        src: message.from,
        dst: message.to,
        text: message.text
      }, (status, response) => {
        if (status < 200 || status > 299) {
          return reject(`${status} response - ${response}`);
        }
        return resolve(response.message_uuid);
      });
    });
  }
}

module.exports = Plivo;
