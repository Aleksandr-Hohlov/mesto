export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick.handleCardClick;
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
    //открыть preview
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
    // лайк актив
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
    // delete карточки
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });
  }
}
