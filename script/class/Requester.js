class Requester {
  status = 'inactive';
  domain = new URL('http://tyrest/php/query_handlers/');
  methodWhiteList = new Set();

  _serverResponse;
  _currURL;
  _fetchParams = {};

  constructor(requestMethod) {
    this.methodWhiteList.add('POST');
    this.methodWhiteList.add('GET');

    if (this.methodWhiteList.has(requestMethod)) {
      this._fetchParams.method = requestMethod;
    } else {
      throw new RequesterError();
    }

    this._fetchParams.referrerPolicy = 'origin-when-cross-origin';
    this._serverResponse = null;
    this._currURL = null;
  }

  /**
   *
   * @param path
   * @param data
   * @return {Promise<void>}
   */
  async sendRequest(path, data) {
    if (this._serverResponse === null) {
      this._currURL = new URL(path, this.domain);

      switch (this._fetchParams.method) {
        case 'POST':
          let params = this._fetchParams;
          params.body = JSON.stringify(data);
          this._serverResponse = await fetch(this._currURL, params);
          break;
        case 'GET':
          let dataStr = '';
          for (let key in data) {
            dataStr += `${key}=${data[key]}&`;
          }

          this._serverResponse = await fetch(`${this._currURL}?${dataStr}`);
          break;
      }
    } else {
      throw new RequesterError();
    }
  }

  async getResult() {
    let result = await this._serverResponse.json();
    if (result.status === 'request_error') {
      throw new RequesterError('Ошибка запроса');
    }

    this._serverResponse = null;
    this._currURL = null;

    return result;
  }
}