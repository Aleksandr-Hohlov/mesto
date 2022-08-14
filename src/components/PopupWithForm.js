import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupFormElement = this._popupElement.querySelector('.popup__form');
    this._inputValues = this._popupFormElement.querySelectorAll('.popup__input');
    this._buttonSubmit = this._popupFormElement.querySelector('.popup__save-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputValues.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._popupFormElement.reset();
  }

  submitText(text) {
    this._buttonSubmit.textContent = text;
  }

  setInputValues(data) {
    this._inputValues.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
