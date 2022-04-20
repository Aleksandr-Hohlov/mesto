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

const popup = document.querySelector('.popup');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const editProfileCloseButton = document.querySelector('.popup__close-button_edit-profile');
const popupEditProfile = document.querySelector('#popup__edit-profile');
const formElement = document.querySelector('.popup__container');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const addButton = document.querySelector('.profile__add-button');
const popupNewPlace = document.querySelector('#popup__new-place');
const formNewPlace = document.querySelector('.popup__form_new-place');
const newPlaceCloseButton = document.querySelector('.popup__close-button_new-place');
const popupPreviewCloseButton = document.querySelector('.popup__close-button_preview');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const placeInput = document.querySelector('.popup__input_type_name-place');
const linkInput = document.querySelector('.popup__input_type_link-place');
const areaElements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card-template').content;
const popupPreviewImg = document.querySelector('#popup__preview-img');
const previewImg = document.querySelector('.popup__preview');
const popupSubtitle = document.querySelector('.popup__subtitle');
const cardPlace = cardTemplate.querySelector('.element').cloneNode(true);
const nameCardPlace = cardPlace.querySelector('.element__name');
const imgCardPlace = cardPlace.querySelector('.element__image');
const likeButtonCardPlace = cardPlace.querySelector('.element__like');
const deleteButtonCardPlace = cardPlace.querySelector('.element__delete');
const cardImgPreview = cardPlace.querySelector('.element__image');

/*функция попап открытие*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/*функция попап закрытие*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/*попап EditProfile функция Открытие попап на кнопку редактирования*/
function openEditProfile () {
  openPopup(popupEditProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  /*document.body.style.overflow = 'hidden';*/
}

/*попап EditProfile функция Закрытие на крестик*/
function closeEditProfile () {
  closePopup(popupEditProfile);
  /*document.body.style.overflow = '';*/
}

/*попап EditProfile функция Сохранение изменений*/
function formSubmitHandler (event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

/*попап NewPlace функция Открытие на кнопку addButton*/
function openNewPlace () {
  placeInput.value = '';
  linkInput.value = '';
  openPopup(popupNewPlace);
}

/*попап NewPlace функция Закрытие на крестик*/
function closeNewPlace () {
  closePopup(popupNewPlace);
}

/*попап popupPreviewImg функция Открытие*/
function openPopupPreview (e) {
  openPopup(popupPreviewImg);
  const cardPlace = e.target.closest('.element');
  const eventTargetText = cardPlace.querySelector('.element__name').textContent;
  const target = e.target;
  const popupImage = cardPlace.querySelector('.element__image')
  const popupImageName = document.querySelector('.popup__subtitle');

  popupImage.src = target.src;
  popupImage.alt = target.alt;
  popupImageName.textContent = eventTargetText;
  previewImg.setAttribute('src', popupImage.src);
  previewImg.setAttribute('alt', eventTargetText);
}

/*попап popupPreviewImg функция Закрытие на крестик*/
function closePopupPreview () {
  closePopup(popupPreviewImg);
}

/*Добавление карточек из массива*/
initialCards.forEach(function (item) {
  render(createCard (item))
})

/*prepend карточки*/
function render(cardPlace) {
  areaElements.prepend(cardPlace);
}

/*создание карточки*/
function createCard (item) {
  const cardPlace = cardTemplate.querySelector('.element').cloneNode(true);
  const nameCardPlace = cardPlace.querySelector('.element__name');
  const imgCardPlace = cardPlace.querySelector('.element__image');
  const likeButtonCardPlace = cardPlace.querySelector('.element__like');
  const deleteButtonCardPlace = cardPlace.querySelector('.element__delete');
  const cardImgPreview = cardPlace.querySelector('.element__image');

  likeButtonCardPlace.addEventListener('click', handlerLikeButton);
  deleteButtonCardPlace.addEventListener('click', handlerDeleteButton);
  cardImgPreview.addEventListener('click', openPopupPreview);
  /*cardImgPreview.addEventListener('click', () => openPopupPreview({ name, link }));*/

  nameCardPlace.textContent = item.name;
  imgCardPlace.src = item.link;
  imgCardPlace.alt = item.name;

  return cardPlace;
}

/*добавление на страницу карточки по Input*/
function formSubmitNewPlace (e) {
  e.preventDefault();
  createCard (linkInput.value, placeInput.value)

  nameCardPlace.textContent = placeInput.value;
  imgCardPlace.src = linkInput.value;
  imgCardPlace.alt = placeInput.value;

  render(cardPlace);
  closePopup(popupNewPlace);
}

/*функция лайк*/
function handlerLikeButton (e) {
  e.target.classList.toggle('element__like_active');
}

/*функция Delete*/
function handlerDeleteButton (e) {
  e.target.closest('.element').remove();
}

/*addEventListener*/
buttonEditProfile.addEventListener('click', openEditProfile);
editProfileCloseButton.addEventListener('click', closeEditProfile);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openNewPlace);
newPlaceCloseButton.addEventListener('click', closeNewPlace);
popupPreviewCloseButton.addEventListener('click', closePopupPreview);
formNewPlace.addEventListener('submit', formSubmitNewPlace);
likeButtonCardPlace.addEventListener('click', handlerLikeButton);
deleteButtonCardPlace.addEventListener('click', handlerDeleteButton);
cardImgPreview.addEventListener('click', openPopupPreview);

