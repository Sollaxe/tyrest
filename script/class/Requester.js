class Requester {
  status = 'inactive';
  domain = new URL('http://tyrest/php/query_handlers/');
  methodWhiteList = new Set();

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
  }

  /**
   *
   * @param path
   * @param data
   * @return {Promise<void>}
   */
  async sendRequest(path, data) {
    if (!path || !data) {
      throw new RequesterError('', 'ParamError');
    }

    let serverResponse;
    let currURL = new URL(path, this.domain);

    switch (this._fetchParams.method) {
      case 'POST':
        let params = this._fetchParams;
        params.body = JSON.stringify(data);
        serverResponse = await fetch(currURL, params);
        break;
      case 'GET':
        let dataStr = '';
        for (let key in data) {
          dataStr += `${key}=${data[key]}&`;
        }
        serverResponse = await fetch(`${currURL}?${dataStr}`);
        break;
    }

    //TODO: Написать более гибкую обработку ответных заголовков
    if (!serverResponse.ok) {
      throw new ServerError(`Ошибка принятия запроса: ${serverResponse.status}`);
    }

    return serverResponse;
  }

  async getResult(response) {
    let result = await response.json();
    console.log(result);

    if (result.status === 'request_error') {
      throw new ServerError('Ошибка принятия запроса');
    }

    return result.data;
  }

  async getData(path, data) {
    try {
      let currResponse = await this.sendRequest(path, data);
      console.dir(currResponse);
      return await this.getResult(currResponse);
    } catch (e) {
      if (e.name === 'RequesterError' && e.type === 'ParamError') {
        return new RequestError('Request is not valid, check data for your request');
      }

      throw e;
    }
  }
}