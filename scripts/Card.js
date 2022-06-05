import { openPopup } from "./index.js";
import { closePopup } from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector(".element__image").src = this._image;
    this._element.querySelector(".element__image").alt = this._title;
    this._element.querySelector(".element__name").textContent = this._title;

    // Вернём элемент наружу
    return this._element;
  }

  //Открыть попап
  _handleOpenPopup() {
    previewImg.src = this._image;
    popupSubtitle.textContent = this._title;
    openPopup(popupPreviewImg);
  }

  //Кнопка лайк
  _handleLikeButton() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  //Кнопка del
  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleOpenPopup(); // откройте попап
      });

    popupPreviewCloseButton.addEventListener("click", closePopup); // закройте попап);

    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeButton(); // лайк актив
      });

    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteButton(); // delete
      });
  }
}
