class PopupError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PopupError';
  }
}

class NotePopupError extends PopupError{
  constructor(message) {
    super(message);
    this.name = 'NotePopupError';
  }
}

class ValueNotePopupError extends NotePopupError {
  constructor(message, nameVal) {
    super(message);
    this.name = 'ValueNotePopupError';
    this.nameValue = nameVal;
    this.message = '\"' + this.nameValue + '\" ' + this.message;
  }
}