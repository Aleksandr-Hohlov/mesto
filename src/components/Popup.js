export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._closeButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
    this._imageElement = this._popupElement.querySelector(".popup__preview");
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    //Закрыть на крестик
    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    //Закрыть на оверлей
    this._popupElement.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    });
  }
}
