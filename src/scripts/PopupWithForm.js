import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupFormElement = this._popupElement.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputValues = this._popupForm.querySelectorAll(".popup__input");
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

  setEventListeners() {
    super.setEventListeners();
    this._popupFormElement.addEventListener("submit", () => {
      this._handleFormSubmit(this._getInputValues());
      //this._popupElement.close();
    });
  }
}
