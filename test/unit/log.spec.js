/* global it, describe, before, after */

const Log = require('../../src/SMS/drivers/Log');
const Message = require('../../src/SMS/SMSManager/message');
require('co-mocha');

describe('Log driver', () => {
  it('should be able to set from name', function * () {
    const message = new Message();
    message.to('1');
    message.from('2');
    message.text('Hello world');
    const log = new Log();
    yield log.send(message.data);
  });
});
