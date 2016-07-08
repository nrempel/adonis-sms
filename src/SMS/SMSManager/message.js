class Message {

  constructor () {
    this.data = {};
  }

  from (fromNumber) {
    this.data.from = fromNumber;
    return this;
  }

  to (toNumber) {
    this.data.to = toNumber;
    return this;
  }

  text (text) {
    this.data.text = text;
    return this;
  }

}

module.exports = Message;
