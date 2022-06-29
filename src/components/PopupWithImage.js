import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.popup__preview');
    this._previewImgSubtitle = this._popupElement.querySelector('.popup__subtitle');
  }

  open({ link, name }) {
    this._previewImgSubtitle.textContent = name;
    this._imageElement.src = link;
    this._imageElement.alt = `Превью ${name}`;

    super.open();
  }
}
