export class Card {
  constructor(
    { name, link, likes, _id, owner },
    cardSelector,
    { handlePreview, handleLike, handleDislike, handleDelete },
  ) {
    this._title = name;
    this._image = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._handlePreview = handlePreview;
    this._handleLike = handleLike;
    this._handleDislike = handleDislike;
    this._handleDelete = handleDelete;
  }

  getID() {
    return this._id;
  }

  _getOwnerId() {
    return this._owner._id;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  //Создаем карточку
  generateCard(userId) {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image');
    this._cardLike = this._element.querySelector('.element__like');
    this._counterLikes = this._element.querySelector('.element__like-counter');
    this._cardDelete = this._element.querySelector('.element__delete');
    this._setEventListeners();

    if (userId !== this._owner._id) {
      this._cardDelete.classList.add('element__delete_disabled');
    }

    // Добавим данные
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector('.element__name').textContent = this._title;
    this._counterLikes.textContent = this._likes.length;
    //this._restoreLikes(userId);

    // Вернём элемент наружу
    return this._element;
  }

  //Кнопка лайк
  _handleLikeButton = () => {
    if (this._isLiked) {
      this._handleDislike(this);
    } else {
      this._handleLike(this);
    }
  };

  //Кнопка лайк toggle
  _toggleLikeButton = () => {
    this._cardLike.classList.toggle('element__like_active');
    this._isLiked = !this._isLiked;
  };

  //Счетчик лайков
  counterCardLike(card) {
    this._likes = card.likes;
    this._counterLikes.textContent = this._likes.length;
    this._toggleLikeButton();
  }

  _restoreLikes(userId) {
    if (
      this._likes.find((element) => {
        return element._id === userId;
      })
    ) {
      this._toggleLike();
    }
  }

  //Кнопка del
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    //открыть preview
    this._cardImage.addEventListener('click', () => {
      this._handlePreview();
    });
    // лайк актив
    this._cardLike.addEventListener('click', () => {
      this._handleLikeButton();
    });
    // delete карточки
    this._cardDelete.addEventListener('click', () => {
      this._handleDelete(this);
    });
  }
}
