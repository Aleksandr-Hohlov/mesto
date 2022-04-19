const initialCards = [
  {
    name: 'Река Алибек',
    link: 'https://i.postimg.cc/3x1kZVYJ/Alibek-River.jpg'
  },{
    name: 'Гебиусские водопады',
    link: 'https://i.postimg.cc/MZRZZNc3/Gebius-Waterfalls.jpg'
  },{
    name: 'Скала Киселева',
    link: 'https://i.postimg.cc/L63HLP3z/Kiselyov-rock.jpg'
  },{
    name: 'Домбай',
    link: 'https://i.postimg.cc/MK6FvfPM/Dombaya-Mountains.jpg'
  },{
    name: 'Черное море',
    link: 'https://i.postimg.cc/VL8fJgnf/The-Black-Sea.jpg'
  },{
    name: 'Гора Ключевая',
    link: 'https://i.postimg.cc/mgdB6Gqk/Klychevay.jpg'
  }
];


const buttonEditProfile = document.querySelector('.profile__edit-button');
const closeButtonEditProfile = document.querySelector('.popup__close-button_edit-profile');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupOpened = 'popup_opened';
const formElement = document.querySelector('.popup__container');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('.popup__new-place');
const closeButtonNewPlace = document.querySelector('.popup__close-button_new-place');
const closeButtonPopupPreview = document.querySelector('.popup__close-button_preview');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeInput = document.querySelector('.popup__input_type_name-place');
const linkInput = document.querySelector('.popup__input_type_link-place');
const areaElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const popupPreviewImg = document.querySelector('.popup__preview-img');
const previewImg = document.querySelector('.popup__preview');
const popupSubtitle = document.querySelector('.popup__subtitle');

/*попап EditProfile функция Открытие попап на кнопку редактирования*/
function openEditProfile () {
  popupEditProfile.classList.add(popupOpened);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  /*document.body.style.overflow = 'hidden';*/
}

/*попап EditProfile функция Закрытие на крестик*/
function closeEditProfile () {
  popupEditProfile.classList.remove(popupOpened);
  /*document.body.style.overflow = '';*/
}

/*попап EditProfile функция Сохранение изменений*/
function formSubmitHandler (event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeEditProfile();
}

/*попап NewPlace функция Открытие на кнопку addButton*/
function openNewPlace () {
  popupNewPlace.classList.add(popupOpened);
  placeInput.value = '';
  linkInput.value = '';
}

/*попап NewPlace функция Закрытие на крестик*/
function closeNewPlace () {
  popupNewPlace.classList.remove(popupOpened);
}

/*попап popupPreviewImg функция Открытие*/
function openPopupPreview (e) {
  popupPreviewImg.classList.add(popupOpened);
  const eventTargetImg = e.target.currentSrc;
  const cardPlace = e.target.closest('.element');
  const eventTargetText = cardPlace.querySelector('.element__name').textContent;
  popupSubtitle.textContent = eventTargetText
  previewImg.setAttribute('src', eventTargetImg);
}

/*попап popupPreviewImg функция Закрытие на крестик*/
function closePopupPreview () {
  popupPreviewImg.classList.remove(popupOpened);
}

/*Цикл массива*/
initialCards.forEach(function (item) {
  addCard (item)
})


/*Добавление карточек из массива*/
function addCard (item) {
  const cardPlace = cardTemplate.querySelector('.element').cloneNode(true);
  const nameCardPlace = cardPlace.querySelector('.element__name');
  const linkCardPlace = cardPlace.querySelector('.element__image');
  const likeButtonCardPlace = cardPlace.querySelector('.element__like');
  const deleteButtonCardPlace = cardPlace.querySelector('.element__delete');
  const cardImgPreview = cardPlace.querySelector('.element__image');

  likeButtonCardPlace.addEventListener('click', handlerLikeButton);
  deleteButtonCardPlace.addEventListener('click', handlerDeleteButton);
  cardImgPreview.addEventListener('click', openPopupPreview);

  nameCardPlace.textContent = item.name;
  linkCardPlace.src = item.link
  areaElements.append(cardPlace)
}

/*функция лайк*/
function handlerLikeButton (e) {
  e.target.classList.toggle('element__like_active');
}
/*функция Delete*/
function handlerDeleteButton (e) {
  e.target.closest('.element').remove();
}

/*функция Добавления карточки*/
function formSubmitNewPlace (e) {
  e.preventDefault();
  const cardPlace = cardTemplate.querySelector('.element').cloneNode(true);
  const nameCardPlace = cardPlace.querySelector('.element__name');
  const linkCardPlace = cardPlace.querySelector('.element__image');
  const likeButtonCardPlace = cardPlace.querySelector('.element__like');
  const deleteButtonCardPlace = cardPlace.querySelector('.element__delete');
  const cardImgPreview = cardPlace.querySelector('.element__image');

  likeButtonCardPlace.addEventListener('click', handlerLikeButton);
  deleteButtonCardPlace.addEventListener('click', handlerDeleteButton);
  cardImgPreview.addEventListener('click', openPopupPreview);

  nameCardPlace.textContent = placeInput.value;
  linkCardPlace.src = linkInput.value
  areaElements.prepend(cardPlace)
  closeNewPlace()
}



/*addEventListener*/
buttonEditProfile.addEventListener('click', openEditProfile);
closeButtonEditProfile.addEventListener('click', closeEditProfile);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openNewPlace);
closeButtonNewPlace.addEventListener('click', closeNewPlace);
closeButtonPopupPreview.addEventListener('click', closePopupPreview);
popupNewPlace.addEventListener('submit', formSubmitNewPlace);



