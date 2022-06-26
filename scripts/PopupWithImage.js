import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector(".popup__subtitle").textContent = name;
    const imageElement = this._popupElement.querySelector(".popup__preview");

    imageElement.src = link;
    imageElement.alt = `Превью ${name}`;

    super.open();
  }
}
