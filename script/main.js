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