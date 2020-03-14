//abstract class
class Requester {
  status = 'inactive';
  domain = new URL('http://tyrest');

  _serverResponse = null;
  _currURL = null;
  _fetchParam = {};

  constructor() {
    this._fetchParam.referrerPolicy = 'origin-when-cross-origin';
  }

  async sendRequest(path, data) {
    if (this._serverResponse === null) {
      this._currURL = new URL(path, this.domain);

      let param = this._fetchParam;
      param.body = data;
      this._serverResponse = await fetch(this._currURL, param);
    } else {
      throw new RequesterError();
    }
  }

  async getResult() {

  }
}


class RequesterGet extends Requester {
  constructor() {
    super();
    this._fetchParam.method = 'GET';
  }

  async getResult() {
    super.getResult();
  }
}

class RequesterPost extends Requester {
  constructor() {
    super();
    this._fetchParam.method = 'POST';
  }

  async getResult() {
    super.getResult();
  }
}