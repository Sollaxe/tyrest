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

class NotePopupError extends PopupError{
  constructor(message) {
    super(message);
    this.name = 'NotePopupError';
  }
}