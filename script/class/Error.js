class PopupError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PopupError';
  }
}

class ParamPopupError extends PopupError{
  constructor(message, paramName) {
    super(message);
    this.name = 'ValueNotePopupError';
    this.nameValue = paramName;
    this.message = '\"' + this.nameValue + '\": ' + this.message;
  }
}

class HeadSliderError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HeadSliderError';
  }
}

class RequesterError  extends Error {
  _typeList = new Set(['ParamError']);

  constructor(message, type) {
    super(message);
    this.name = 'RequesterError';

    if (!this._typeList.has(type)) {
      throw new SyntaxError('invalid type for RequesterError');
    }

    this.type = type;
  }
}

class RequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequestError';
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
  }
}