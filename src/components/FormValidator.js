export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;

    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
  }

  // Функция, которая добавляет класс с ошибкой
  _showInputError = (inputElement, errorMessage) => {
    const { inputErrorClass, ErrorClass } = this._settings;
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(ErrorClass);
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (inputElement) => {
    const { inputErrorClass, ErrorClass } = this._settings;

    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(ErrorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput = () => {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true// Обход массива прекратится и вся функция// hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    const { inactiveButtonClass } = this._settings;

    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
    } else {
      this._buttonElement.classList.remove(inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled', 'disabled');
    }
  }

  _setEventListeners() {
    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState(); //<== управляем кнопкой ==
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); //<==очищаем ошибки ==
    });
  }

  validateButton() {
    this._toggleButtonState();
  }
}
