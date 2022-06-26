export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }
  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => {
      this._handleEscClose(e);
    });
  }

  setEventListeners() {
    //Закрыть на крестик
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    //Закрыть на Esc
    this._popupElement.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
    //Закрыть на оверлей
    this._popupElement.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
  }
}
