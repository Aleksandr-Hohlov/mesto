import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector(".popup__subtitle").textContent = name;

    this._imageElement.src = link;
    this._imageElement.alt = `Превью ${name}`;

    super.open();
  }
}
