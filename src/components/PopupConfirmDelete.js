import { Popup } from './Popup.js';

export class PopupConfirmDelete extends Popup {
  constructor(popupSelector, { formSelector }, handleDeleteCard) {
    super(popupSelector);
    this._formSelector = formSelector;
    this._handleDeleteCard = handleDeleteCard;
    this._form = this._popupElement.querySelector(this._formSelector);
    this._buttonSubmit = this._form.querySelector('.popup__save-button');
  }

  _handleConfirmRemove = (event) => {
    event.preventDefault();
    this._handleDeleteCard(this._card);
  };

  open = (card) => {
    this._card = card;
    super.open();
  };

  submitText(text) {
    this._buttonSubmit.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleConfirmRemove);
  }
}
